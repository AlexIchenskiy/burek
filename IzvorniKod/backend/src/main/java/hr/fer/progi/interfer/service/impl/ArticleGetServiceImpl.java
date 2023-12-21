package hr.fer.progi.interfer.service.impl;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.ArticleSearchDTO;
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
    public ResponseEntity<?> getAllArticles(ArticleSearchDTO articleDetails){

      

        Article article = new Article();
        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setAuthor(articleDetails.getAuthor());
        article.setCategory(articleDetails.getCategory());
        article.setTags(articleDetails.getTags());
        article.setModerated(false);
        article.setPublished(true);

        ExampleMatcher matcher = ExampleMatcher.matching()                                         
                                                .withIgnoreNullValues()
                                                .withIgnoreCase()
                                                .withIgnorePaths("moderated", "published", "datePublished");
                                               
                                                //.withMatcher("content", match -> match.contains())
                                                //.withMatcher("tags", match -> match.contains());
    
        Example<Article> example = Example.of(article, matcher);

        return ResponseEntity.status(HttpStatus.OK).body(articleRepository.findAll(example));
        
    }
}
