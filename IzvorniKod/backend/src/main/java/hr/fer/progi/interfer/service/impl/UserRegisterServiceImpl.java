package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.UserRegistrationDTO;
import hr.fer.progi.interfer.dto.response.AuthTokenDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserRegisterService;
import hr.fer.progi.interfer.validation.EmailDomainValidator;

@Service
public class UserRegisterServiceImpl implements UserRegisterService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtUtil jwtUtil;

	public ResponseEntity<?> register(UserRegistrationDTO userDetails) {

		EmailDomainValidator validator = new EmailDomainValidator();
		if (!validator.isValid(userDetails.getEmail()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong email domain");
		if (userRepository.existsByEmail(userDetails.getEmail()))
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered.");
		try {
			User newUser = new User();
			newUser.setFirstName(userDetails.getFirstname());
			newUser.setLastName(userDetails.getLastname());
			newUser.setEmail(userDetails.getEmail());
			newUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
			newUser.setRole(UserRole.STUDENT);
			newUser.setEnabled(true); 						// promjeniti kad se doda potvrada maila
			userRepository.save(newUser);

			return  ResponseEntity.status(HttpStatus.CREATED).body(new AuthTokenDTO(jwtUtil.generateToken(newUser)));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

}
