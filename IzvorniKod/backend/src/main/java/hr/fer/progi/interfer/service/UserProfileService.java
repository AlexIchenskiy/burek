package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface UserProfileService {
	
	ResponseEntity<?> profile(String authorizationHeader);
	

}
