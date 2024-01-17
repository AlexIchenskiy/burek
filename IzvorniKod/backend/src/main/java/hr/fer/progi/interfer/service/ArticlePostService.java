package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleEditDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;

public interface ArticlePostService {

    ResponseEntity<?> addArticle(String authorizationHeader, ArticlePostDTO articleDetails);
    ResponseEntity<?> updateArticle (String authorizationHeader, ArticleEditDTO articleDetails);
}
