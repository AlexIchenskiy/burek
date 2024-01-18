package hr.fer.progi.interfer.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleSearchDTO;
import hr.fer.progi.interfer.dto.response.ArticleSearchResponseDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.CategoryRepository;
import hr.fer.progi.interfer.service.ArticleGetService;

@Service
public class ArticleGetServiceImpl implements ArticleGetService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> getArticle(Long id) {
        try{

            Optional<Article> article = articleRepository.findById(id);
            if (article.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
            }
            Article a = article.get();
            ArticleSearchResponseDTO.ArticleDTO response = new ArticleSearchResponseDTO.ArticleDTO(
        	    a.getId(), 
                a.getTitle(), 
                a.getAuthor().getId(),
                a.getAuthor().getFirstName() + " " + a.getAuthor().getLastName(), 
                a.getTags(), 
                a.getContent(), 
                a.isPublished(), 
                a.getDatePublished(), 
                a.getCategory().getName()
            );
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @Override
    public ResponseEntity<?> getAllArticles(ArticleSearchDTO articleDetails){

        //TODO dodaj ograničenja na minimalnu duljinu sadržaja pretraživanja (content na barem 3 znaka i sl.), pretraga po 1 slovu nema baš smisla

        try {

            Category articleCategory; 

            Article article = new Article();
            article.setTitle(articleDetails.getTitle());
            article.setContent(articleDetails.getContent());       
            //article.setAuthor(articleDetails.getAuthor());
            if(articleDetails.getCategoryName() != null)
            {
                articleCategory = categoryRepository.findByName(articleDetails.getCategoryName());
                if(articleCategory == null)
                {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Category not found");
                }
                article.setCategory(articleCategory);
            }
            article.setTags(articleDetails.getTags());
            article.setPublished(true);
   

        /*
            category, autor, published: exact match
            title, content, tags: contains
         */
        final ExampleMatcher matcher = ExampleMatcher.matching()                                         
                                                .withIgnoreNullValues()
                                                .withIgnoreCase()
                                                .withIgnorePaths("moderated", "datePublished")
                                                .withMatcher("title", match -> match.contains())
                                                .withMatcher("content", match -> match.contains())
                                                .withMatcher("tags", match -> match.contains());
                                                
    
        Example<Article> example = Example.of(article, matcher);

        int page = articleDetails.getPage();
        if(page < 1){
            page = 1;
        }
        page--;

        Pageable pageRequest = PageRequest.of(page, 5, Sort.by("datePublished").descending()); 
                   
     
        
            Page<Article> pageResult = articleRepository.findAll(example, pageRequest); 

            return ResponseEntity.status(HttpStatus.OK).body(pageToDto(pageResult));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }


    

    private ArticleSearchResponseDTO pageToDto(Page<Article> pageResult){

        List<Article> articlePage = pageResult.getContent();

        ArticleSearchResponseDTO response = new ArticleSearchResponseDTO(); 

        response.setTotalPages(pageResult.getTotalPages());
        
        response.setArticlePage(articlePage.stream()
                                .map(a -> new ArticleSearchResponseDTO.ArticleDTO(a.getId(), a.getTitle(), a.getAuthor().getId(),a.getAuthor().getFirstName() + " " + a.getAuthor().getLastName(), a.getTags(), a.getContent(), a.isPublished(), a.getDatePublished(), a.getCategory().getName()))
                                .toList());


        return response;
    }

}
