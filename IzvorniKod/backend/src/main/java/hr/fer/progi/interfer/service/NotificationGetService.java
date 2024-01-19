package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface NotificationGetService {
	
	ResponseEntity<?> getAll(String authorizationHeader);

	ResponseEntity<?> getAllSent(String authorizationHeader);

	ResponseEntity<?> get(String authorizationHeader, Long id);

}
