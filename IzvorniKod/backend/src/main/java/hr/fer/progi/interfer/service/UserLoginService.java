package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.UserLoginDTO;

public interface UserLoginService {

    ResponseEntity<?> login(UserLoginDTO userDetails);

}
