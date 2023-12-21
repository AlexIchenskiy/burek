package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticlePostDTO;

import hr.fer.progi.interfer.entity.Article;

import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.service.ArticlePostService;
import lombok.extern.java.Log;


@Service
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
            newArticle.setAuthor(articleDetails.getAuthor());
            newArticle.setContent(articleDetails.getContent());
            newArticle.setPublished(articleDetails.isPosted());
            newArticle.setDatePublished(new Timestamp(System.currentTimeMillis())); 
            newArticle.setTags(articleDetails.getTags());
            newArticle.setCategory(articleDetails.getCategory());
            newArticle.setModerated(false);
            articleRepository.save(newArticle);
            System.out.println("Saved Article");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Added article");
        }
        catch (Exception e) {
            System.out.println("Error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
