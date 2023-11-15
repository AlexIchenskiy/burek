package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;

public interface UserRegisterService {
	
	ResponseEntity<?> register(UserRegistrationDTO user);

}
