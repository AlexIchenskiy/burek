package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;
import hr.fer.progi.interfer.dto.request.ArticleGetDTO;

public interface ArticleGetService {
    
    ResponseEntity<?> getArticle (ArticleGetDTO articleDetails);

    //ResponseEntity<?> getAllArticles ();
}
