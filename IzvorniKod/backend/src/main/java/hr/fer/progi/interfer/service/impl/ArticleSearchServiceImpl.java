package hr.fer.progi.interfer.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleCategoryDTO;
import hr.fer.progi.interfer.dto.request.ArticleTitleDTO;
import hr.fer.progi.interfer.entity.Article;

import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.service.ArticleSearchService;

@Service
public class ArticleSearchServiceImpl implements ArticleSearchService{
    @Autowired
	ArticleRepository articleRepository;



    @Override
    public ResponseEntity<?> getArticlesByCategory(ArticleCategoryDTO articleCategory){

        List<Article> articles = articleRepository.findByCategory(articleCategory.getCategory());

        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }
    @Override
    public ResponseEntity<?> getArticlesByTitle(ArticleTitleDTO articleTitle) {

        List<Article> articles = articleRepository.findByTitle(articleTitle.getTitle()); //možda getAll pa napp f-ju za određivanje sličnosti 

        return ResponseEntity.status(HttpStatus.OK).body(articles);
    }
}
