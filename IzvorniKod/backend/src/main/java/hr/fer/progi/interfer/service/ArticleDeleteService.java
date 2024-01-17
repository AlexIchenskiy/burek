package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface ArticleDeleteService {

    ResponseEntity<?> deleteArticle(long id);

}
