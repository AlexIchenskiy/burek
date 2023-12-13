package hr.fer.progi.interfer.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.entity.Article;

import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.service.ArticleGetService;

@Service
public class ArticleGetServiceImpl implements ArticleGetService{
    @Autowired
	ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> getArticle (ArticleGetDTO articleDetails)
    {
        Optional<Article> article = articleRepository.findById(articleDetails.getId());
        if (article.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(article);
    }
    @Override
    public ResponseEntity<?> getAllArticles(){

        List<Article> articles = articleRepository.findAll();

        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }
}
