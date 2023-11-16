package hr.fer.progi.interfer.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.entity.Article;

import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.service.ArticleGetService;

public class ArticleGetServiceImpl implements ArticleGetService{
    @Autowired
	ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> getArticle (ArticleGetDTO articleDetails)
    {
        Optional<Article> article = articleRepository.findById(articleDetails.getId());
        if (!article.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(article);
    }
    /*@Override
    public ResponseEntity<?> getAllArticles(){



        return ResponseEntity.status(HttpStatus.OK).body();
    }*/
}
