package hr.fer.progi.interfer.service.impl;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.entity.Comment;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.CommentRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.CommentDeleteService;
import jakarta.validation.Valid;

@Service
public class CommentDeleteServiceImpl implements CommentDeleteService {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public ResponseEntity<?> delete(String authorizationHeader, @Valid ArticleGetDTO commentDetails) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
		
		User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
		
		try {
			Comment comment = commentRepository.findById(commentDetails.getId()).get();
			User author = comment.getAuthor();
			
			if(!author.getId().equals(user.getId()))
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only creator of comment can delete it");
			
			commentRepository.delete(comment);
			
			return ResponseEntity.status(HttpStatus.OK).body("Comment delited");
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong comment ID");
		}
	}

}
