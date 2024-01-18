package hr.fer.progi.interfer.service;

import hr.fer.progi.interfer.dto.request.UserEditDTO;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

public interface UserProfileService {

    ResponseEntity<?> profile(String authorizationHeader);

    ResponseEntity<?> getUserById(Long id);

    ResponseEntity<?> edit(String authorizationHeader, @Valid UserEditDTO userDetails);

    ResponseEntity<?> chackUser(String mail);
    
    ResponseEntity<?> getAll(String authorizationHeader);

}
