package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;

public interface ArticlePostService {
    
    ResponseEntity<?> addArticle (ArticlePostDTO articleDetails);
}




