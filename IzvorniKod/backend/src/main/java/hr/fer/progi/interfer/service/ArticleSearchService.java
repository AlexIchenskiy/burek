package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleCategoryDTO;
import hr.fer.progi.interfer.dto.request.ArticleTitleDTO;


public interface ArticleSearchService {
    
    ResponseEntity<?> getArticlesByTitle(ArticleTitleDTO articleTitle);
    ResponseEntity<?> getArticlesByCategory(ArticleCategoryDTO articleCategory);
}
