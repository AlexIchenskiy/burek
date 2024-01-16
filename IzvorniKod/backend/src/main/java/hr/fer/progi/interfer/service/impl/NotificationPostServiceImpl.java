package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import hr.fer.progi.interfer.repository.ArticleRepository;
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
	private ArticleRepository articleRepository;

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
	public ResponseEntity<?> requestModifyArticle(long id, ArticlePostDTO articleDetails) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByEmail((String) authentication.getPrincipal());

		if (user == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
		if (user.getRole() == UserRole.STUDENT)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to delete articles");

		var article = articleRepository.findById(id);
		if (article.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");

		if (articleDetails.getTitle() == null && articleDetails.getContent() == null && articleDetails.getTags() == null && articleDetails.getCategory() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify at least one modification");

		var requestedChanges = new StringBuilder();
		if (articleDetails.getTitle() != null)
			requestedChanges.append(String.format("\nTitle: %s", articleDetails.getTitle()));
		if (articleDetails.getContent() != null)
			requestedChanges.append(String.format("\nContent: %s", articleDetails.getContent()));
		if (articleDetails.getTags() != null)
			requestedChanges.append(String.format("\nTags: %s", articleDetails.getTags()));
		if (articleDetails.getCategory() != null)
			requestedChanges.append(String.format("\nTags: %s", articleDetails.getCategory()));

		var notification = Notification
				.builder()
				.to(Set.of(article.get().getAuthor()))
				.subject(String.format("A moderator has requested a modification for your article: %s", article.get().getTitle()))
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
