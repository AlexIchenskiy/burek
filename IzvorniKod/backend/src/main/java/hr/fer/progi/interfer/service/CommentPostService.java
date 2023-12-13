package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.CommentPostDTO;
import jakarta.validation.Valid;

public interface CommentPostService {

	ResponseEntity<?> post(String authorizationHeader, @Valid CommentPostDTO commentDetails);
	
}
