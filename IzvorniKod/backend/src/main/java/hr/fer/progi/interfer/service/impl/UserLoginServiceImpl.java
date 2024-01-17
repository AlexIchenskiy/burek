package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.UserLoginDTO;
import hr.fer.progi.interfer.dto.response.AuthTokenDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserLoginService;

@Service
public class UserLoginServiceImpl implements UserLoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public ResponseEntity<?> login(UserLoginDTO userDetails) {
        User user = userRepository.findByEmail(userDetails.getEmail());
        if (user == null || !passwordEncoder.matches(userDetails.getPassword(), user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        
        return ResponseEntity.status(HttpStatus.OK).body(new AuthTokenDTO(jwtUtil.generateToken(user)));
    }

}
