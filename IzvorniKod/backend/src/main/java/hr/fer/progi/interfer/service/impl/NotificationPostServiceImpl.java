package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import hr.fer.progi.interfer.dto.request.CommentContentDTO;
import hr.fer.progi.interfer.dto.request.CommentPostDTO;
import hr.fer.progi.interfer.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import hr.fer.progi.interfer.entity.Notification;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.NotificationRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.NotificationPostService;
import jakarta.validation.Valid;

@Service
public class NotificationPostServiceImpl implements NotificationPostService{
	
	@Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Override
	public ResponseEntity<?> send(String authorizationHeader, @Valid NotificationPostDTO notificationDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User sender = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		if (sender == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
        if (sender.getRole() == UserRole.STUDENT)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to send notifications");
        
        List<Notification> notifications = new ArrayList<>();
        for(String user : notificationDetails.getTo()) {
        	Notification newNotification = new Notification();
        	
        	newNotification.setFrom(sender);
        	if (!userRepository.existsByEmail(user))
        		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User " + user + "does not exist");
        	newNotification.setTo(Set.of(userRepository.findByEmail(user)));
        	newNotification.setSubject(notificationDetails.getSubject());
        	newNotification.setContent(notificationDetails.getContent());
        	newNotification.setDateSent(Timestamp.from(Instant.now()));
        	newNotification.setSeen(false);
        	
        	notifications.add(newNotification);
        }

        notificationRepository.saveAll(notifications);
        
        return ResponseEntity.status(HttpStatus.OK).body("Notification sent");
	}

	@Override
	public ResponseEntity<?> requestModifyComment(long id, CommentContentDTO commentDetails) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByEmail((String) authentication.getPrincipal());

		if (user == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
		if (user.getRole() == UserRole.STUDENT)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to delete articles");

		var comment = commentRepository.findById(id);
		if (comment.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");

		if (commentDetails.getContent() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify the modification");

		var requestedChanges = new StringBuilder();
		requestedChanges.append(String.format("\nContent: %s", commentDetails.getContent()));

		var notification = Notification
				.builder()
				.to(Set.of(comment.get().getAuthor()))
				.subject("A moderator has requested a modification for your comment") // FIX: dodati nekakav indikator koji je komentar u pitanju
				.content(String.format("Requested changes: %s", requestedChanges))
				.dateSent(Timestamp.from(Instant.now()))
				.seen(false)
				.build();

		notificationRepository.save(notification);

		return ResponseEntity.status(HttpStatus.OK).body("Request for modifying article successfully sent");
	}

	@Override
	public ResponseEntity<?> reportArticle(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User sender = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		return null;
	}

	@Override
	public ResponseEntity<?> reportComment(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		// TODO Auto-generated method stub
		return null;
	}

}
