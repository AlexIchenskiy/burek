package hr.fer.progi.interfer.service;


import org.springframework.http.ResponseEntity;
import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.ArticleSearchDTO;

public interface ArticleGetService {
    
    ResponseEntity<?> getArticle (ArticleGetDTO articleDetails);
    
    ResponseEntity<?> getAllArticles (ArticleSearchDTO articleDetails);

}
