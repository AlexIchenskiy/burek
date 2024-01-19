package hr.fer.progi.interfer.service.impl;

import hr.fer.progi.interfer.dto.request.ArticleRatingPostDTO;
import hr.fer.progi.interfer.entity.ArticleRating;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.repository.ArticleRatingRepository;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticleRatingPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ArticleRatingPostServiceImpl implements ArticleRatingPostService {

    @Autowired
    ArticleRatingRepository articleRatingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> addArticleRating(ArticleRatingPostDTO ratingDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
        if (articleRepository.findById(ratingDetails.getArticleId()).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ratingDetails.getArticleId());
        //if (user.getArticles().)

        try {
            articleRatingRepository
                    .findByUserIdAndArticleId(user.getId(), ratingDetails.getArticleId())
                    .ifPresent(articleRating -> articleRatingRepository.delete(articleRating));

            // Builder pattern - oku ugodan
            ArticleRating newArticleRating = ArticleRating
                    .builder()
                    .articleId(ratingDetails.getArticleId())
                    .userId(user.getId())
                    .rating(ratingDetails.getRating())
                    .build();

            articleRatingRepository.save(newArticleRating);

            return ResponseEntity.status(HttpStatus.OK).body(newArticleRating);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
