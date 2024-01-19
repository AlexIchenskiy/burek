package hr.fer.progi.interfer.service.impl;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.entity.Notification;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.NotificationRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.NotificationDeleteService;

@Service
public class NotificationDeleteServiceImpl implements NotificationDeleteService{
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	

	@Override
	public ResponseEntity<?> delete(String authorizationHeader, Long id) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		try {
			Notification notification = notificationRepository.findById(id).get();
			
			if (!notification.getTo().contains(user) && !notification.getFrom().getId().equals(user.getId()))
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied, not owner");
			
			notificationRepository.delete(notification);
			
			return ResponseEntity.status(HttpStatus.OK).body("Notification deleted");
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong notification id");
		}
	}

}
