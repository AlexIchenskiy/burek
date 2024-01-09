package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface NotificationGetService {
	
	ResponseEntity<?> get(String authorizationHeader);

}
