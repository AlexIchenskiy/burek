package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleEditDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;

import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticlePostService;

@Service
public class ArticlePostServiceImpl implements ArticlePostService {

    @Autowired
    ArticleRepository articleRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> addArticle(String authorizationHeader, ArticlePostDTO articleDetails) {
    	if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User author = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));
        
        try {
            Article newArticle = new Article();
            String category = "trending";

            newArticle.setTitle(articleDetails.getTitle());
            newArticle.setAuthor(author);
            newArticle.setContent(articleDetails.getContent());
            newArticle.setPublished(articleDetails.isPosted());
            newArticle.setDatePublished(new Timestamp(System.currentTimeMillis()));
            newArticle.setTags(articleDetails.getTags());
            newArticle.setCategory(category);// FIX kod spajanja frontenda: vratiti articleDetails.getCategory() za spremanje kategorije 
            newArticle.setModerated(false);
            articleRepository.save(newArticle);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Added article");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    public ResponseEntity<?> updateArticle (ArticleEditDTO articleDetails)
    {
        try{
            Optional<Article> optArticle = articleRepository.findById(articleDetails.getId());

            if(optArticle.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Article not found");
            }
            articleRepository.updateArticle(articleDetails.getTitle(), articleDetails.getContent(), articleDetails.getCategory(), articleDetails.getTags(), articleDetails.isPublished(), articleDetails.getId()); //TODO dodat provjeru korisnika (samo smije uređivati vlastite članke)

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated article");
        }
        catch (Exception e) {
            System.out.println("Error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }
}
