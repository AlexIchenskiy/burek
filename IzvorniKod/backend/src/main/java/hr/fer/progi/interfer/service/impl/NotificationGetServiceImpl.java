package hr.fer.progi.interfer.service.impl;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.response.NotificationDTO;
import hr.fer.progi.interfer.entity.Notification;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.NotificationRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.NotificationGetService;

@Service
public class NotificationGetServiceImpl implements NotificationGetService{
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private NotificationRepository notificationRepository;

	@Override
	public ResponseEntity<?> getAll(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		List<NotificationDTO> notifications = user.getReceivedNotifications().stream()
			.map(n -> new NotificationDTO(
					n.getId(), 
					n.getFrom().getFirstName() + " " + n.getFrom().getLastName(),
					n.getFrom().getId(),
					n.getFrom().getRole().toString(), 
					n.getSubject(), 
					n.getContent(), 
					n.getDateSent().toLocalDateTime(), 
					n.getSeen(),
					n.getReportId()))
			.toList();
		
		return ResponseEntity.status(HttpStatus.OK).body(notifications);
	}

	@Override
	public ResponseEntity<?> getAllSent(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		List<NotificationDTO> notifications = user.getSentNotifications().stream()
			.map(n -> new NotificationDTO(
					n.getId(), 
					n.getFrom().getFirstName() + " " + n.getFrom().getLastName(),
					n.getFrom().getId(),
					n.getFrom().getRole().toString(), 
					n.getSubject(), 
					n.getContent(), 
					n.getDateSent().toLocalDateTime(), 
					n.getSeen(),
					n.getReportId()))
			.toList();
		
		return ResponseEntity.status(HttpStatus.OK).body(notifications);
	}

	@Override
	public ResponseEntity<?> get(String authorizationHeader, Long id) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		try {
			Notification notification = notificationRepository.findById(id).get();
			
			if (!notification.getTo().contains(user) && !notification.getFrom().getId().equals(user.getId()))
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied, not owner");
			
			if (notification.getTo().contains(user))
				notification.setSeen(true);
				
			NotificationDTO dto = new NotificationDTO(
					notification.getId(), 
					notification.getFrom().getFirstName() + " " + notification.getFrom().getLastName(),
					notification.getFrom().getId(),
					notification.getFrom().getRole().toString(), 
					notification.getSubject(), 
					notification.getContent(), 
					notification.getDateSent().toLocalDateTime(), 
					notification.getSeen(),
					notification.getReportId());
			
			return ResponseEntity.status(HttpStatus.OK).body(dto);

		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong notification id");
		}
	}

}
