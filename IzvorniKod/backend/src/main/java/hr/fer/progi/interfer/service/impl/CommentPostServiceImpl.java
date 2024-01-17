package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.CommentPostDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Comment;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.CommentRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.CommentPostService;
import jakarta.validation.Valid;

@Service
public class CommentPostServiceImpl implements CommentPostService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public ResponseEntity<?> post(String authorizationHeader, @Valid CommentPostDTO commentDetails) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User author = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        if (author.isBanned())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is banned");

        try {
            Article article = articleRepository.findById(commentDetails.getArticle_id()).get();

            Comment newComment = new Comment();
            newComment.setArticle(article);
            newComment.setAuthor(author);
            newComment.setContent(commentDetails.getContent());
            newComment.setDatePublished(Timestamp.from(Instant.now()));

            commentRepository.save(newComment);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong article ID");
        } /*
           * catch (Exception e) {
           * return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).
           * body("Error ocurred while saving comment");
           * }
           */

        return ResponseEntity.status(HttpStatus.CREATED).body("Comment posted");

    }

}
