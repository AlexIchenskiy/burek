package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface UserDeleteService {
	
	public ResponseEntity<?> delte(String authorizationHeader);

}