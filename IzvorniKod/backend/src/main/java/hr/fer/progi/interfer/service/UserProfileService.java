package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;
import jakarta.validation.Valid;

public interface UserProfileService {

    ResponseEntity<?> profile(String authorizationHeader);

    ResponseEntity<?> getUserById(@Valid ArticleGetDTO userDetails);

    ResponseEntity<?> edit(String authorizationHeader, @Valid UserRegistrationDTO userDetails);

}
