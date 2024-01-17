package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleDeleteDTO;

public interface ArticleDeleteService {

    ResponseEntity<?> deleteArticle(long id);

}
