package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticlePostDTO;

import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticlePostService;

@Service
public class ArticlePostServiceImpl implements ArticlePostService {

    @Autowired
    ArticleRepository articleRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> addArticle(String authorizationHeader, ArticlePostDTO articleDetails) {
    	if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User author = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        if (author.isBanned())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is banned");
        
        try {
            Article newArticle = new Article();

            newArticle.setTitle(articleDetails.getTitle());
            newArticle.setAuthor(author);
            newArticle.setContent(articleDetails.getContent());
            newArticle.setPublished(articleDetails.isPosted());
            newArticle.setDatePublished(new Timestamp(System.currentTimeMillis()));
            newArticle.setTags(articleDetails.getTags());
            newArticle.setCategory(articleDetails.getCategory());
            newArticle.setModerated(false);
            articleRepository.save(newArticle);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Added article");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
