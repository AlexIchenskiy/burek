package hr.fer.progi.interfer.service;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import org.springframework.http.ResponseEntity;

public interface ArticleRatingDeleteService {
    ResponseEntity<?> deleteArticleRating(ArticleGetDTO articleDetails);
}
