package hr.fer.progi.interfer.service.impl;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.repository.ArticleRatingRepository;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticleRatingDeleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ArticleRatingDeleteServiceImpl implements ArticleRatingDeleteService {

    @Autowired
    ArticleRatingRepository articleRatingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> deleteArticleRating(ArticleGetDTO articleDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
        if (articleRepository.findById(articleDetails.getId()).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(articleDetails);

        try {
            articleRatingRepository
                    .findByUserIdAndArticleId(user.getId(), articleDetails.getId())
                    .ifPresent(articleRating -> articleRatingRepository.delete(articleRating));

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
