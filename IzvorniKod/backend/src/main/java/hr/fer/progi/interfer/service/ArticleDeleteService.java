package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface ArticleDeleteService {

	public ResponseEntity<?> deleteArticle(String authorizationHeader, Long id);

}
