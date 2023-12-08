package hr.fer.progi.interfer.service;

import hr.fer.progi.interfer.dto.request.ArticleRatingPostDTO;
import org.springframework.http.ResponseEntity;

public interface ArticleRatingPostService {
    ResponseEntity<?> addArticleRating(ArticleRatingPostDTO ratingDetails);
}
