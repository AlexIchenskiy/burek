package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import hr.fer.progi.interfer.dto.response.AuthTokenDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.service.ArticlePostService;



public class ArticlePostServiceImpl implements ArticlePostService{

    @Autowired
	ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> addArticle(ArticlePostDTO articleDetails) 
    {
        //validacija tokena
        try{
        Article newArticle = new Article();

            newArticle.setTitle(articleDetails.getTitle());
            newArticle.setContent(articleDetails.getContent());
            newArticle.setPublished(articleDetails.isPosted());
            newArticle.setDatePublished(new Timestamp(System.currentTimeMillis())); 
            newArticle.setTags(articleDetails.getTags());
            newArticle.setModerated(false);
            articleRepository.save(newArticle);

            return (ResponseEntity<?>) ResponseEntity.ok();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
