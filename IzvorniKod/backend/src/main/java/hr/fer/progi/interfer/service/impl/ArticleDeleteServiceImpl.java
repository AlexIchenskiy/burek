package hr.fer.progi.interfer.service.impl;

import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticleDeleteService;

@Service
public class ArticleDeleteServiceImpl implements ArticleDeleteService {

	@Autowired
    private JwtUtil jwtUtil;
	
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> deleteArticle(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");

        Optional<Article> article = articleRepository.findById(id);
        if (article.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");

        if (user.getRole() == UserRole.STUDENT && !Objects.equals(user.getId(), article.get().getAuthor().getId()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authorized to delete this article");

        articleRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

}
