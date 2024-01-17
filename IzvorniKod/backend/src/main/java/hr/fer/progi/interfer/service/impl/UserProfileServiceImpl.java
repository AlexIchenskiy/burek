package hr.fer.progi.interfer.service.impl;

import java.util.NoSuchElementException;

import hr.fer.progi.interfer.dto.request.UserEditDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.response.UserDetailsDTO;
import hr.fer.progi.interfer.dto.response.UserProfileDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.UserProfileService;
import hr.fer.progi.interfer.validation.EmailDomainValidator;
import jakarta.validation.Valid;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> profile(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

            UserProfileDTO userDto = new UserProfileDTO();
            userDto.setFirstname(user.getFirstName());
            userDto.setLastname(user.getLastName());
            userDto.setEmail(user.getEmail());
            userDto.setRole(user.getRole());
            userDto.setSavedArticles(user.getArticles().stream()
            		.filter(a -> !a.getPublished())
            		.map(a -> new UserProfileDTO.ArticleDTO(a.getId(), a.getTitle(), a.getTags(), a.getContent(), a.getCategory().getName()))
            		.toList());
            userDto.setPublishedArticles(user.getArticles().stream()
            		.filter(a -> a.getPublished())
            		.map(a -> new UserProfileDTO.ArticleDTO(a.getId(), a.getTitle(), a.getTags(), a.getContent(), a.getCategory().getName()))
            		.toList());

            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
    }

    @Override
    public ResponseEntity<?> getUserById(Long id) {

        try {
            User user = userRepository.findById(id).get();
            
            UserDetailsDTO userDto = new UserDetailsDTO();
            userDto.setFirstname(user.getFirstName());
            userDto.setLastname(user.getLastName());
            userDto.setEmail(user.getEmail());
            userDto.setRole(user.getRole());
            userDto.setArticles(user.getArticles().stream()
            		.filter(a -> a.getPublished())
            		.map(a -> new UserDetailsDTO.ArticleDTO(a.getId(), a.getTitle(), a.getTags(), a.getContent(), a.getCategory().getName()))
            		.toList());

            return ResponseEntity.status(HttpStatus.OK).body(userDto);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong user ID");
        }

    }

    @Override
    public ResponseEntity<?> edit(String authorizationHeader, @Valid UserEditDTO userDetails) {
        EmailDomainValidator validator = new EmailDomainValidator();
        if (!validator.isValid(userDetails.getEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong email domain");

        try {
            User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
            user.setFirstName(userDetails.getFirstname());
            user.setLastName(userDetails.getLastname());
            user.setEmail(userDetails.getEmail());
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Profile edited successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

	public ResponseEntity<?> chackUser(String mail) {
		if (userRepository.existsByEmail(mail))
			return ResponseEntity.status(HttpStatus.OK).body(true);
		
		return ResponseEntity.status(HttpStatus.OK).body(false);
	}

}
