package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface ArticleRatingDeleteService {

    ResponseEntity<?> deleteArticleRating(Long id);

}
