package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserDeleteService;

@Service
public class UserDeleteServiceImpl implements UserDeleteService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> delete(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        userRepository.delete(user);

        return ResponseEntity.status(HttpStatus.OK).body("User deleted");
    }

}
