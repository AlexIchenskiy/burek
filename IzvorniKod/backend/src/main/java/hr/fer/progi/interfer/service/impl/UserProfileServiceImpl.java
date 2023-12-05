package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.response.UserDetailsDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserProfileService;

@Service
public class UserProfileServiceImpl implements UserProfileService{

	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Override
	public ResponseEntity<?> profile(String authorizationHeader) {
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
			
			UserDetailsDTO userDto = new UserDetailsDTO();
			userDto.setFirstname(user.getFirstName());
			userDto.setLastname(user.getLastName());
			userDto.setEmail(user.getEmail());
			userDto.setRole(user.getRole());
			
			return ResponseEntity.status(HttpStatus.OK).body(userDto);
        }

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
	}


}
