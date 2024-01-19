package hr.fer.progi.interfer.service.impl;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleEditDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import hr.fer.progi.interfer.dto.response.ArticlePostResponseDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.CategoryRepository;
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

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> addArticle(String authorizationHeader, ArticlePostDTO articleDetails) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User author = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        if (author.isBanned())
            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body("User is banned");
        // NOTE: status i am a teapot je za razlikovanje od forbidden, jer frontend na
        // osnovu statusa odlučuje o svojoj poruci greške, a ovo je previše dobra šala
        // da ju propustim

        try {
            Article newArticle = new Article();

            Category articleCategory = categoryRepository.findByName(articleDetails.getCategoryName());
            if (articleCategory == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category not defined");
            }

            newArticle.setTitle(articleDetails.getTitle());
            newArticle.setAuthor(author);
            newArticle.setContent(articleDetails.getContent());
            newArticle.setPublished(articleDetails.isPosted());
            newArticle.setDatePublished(new Timestamp(System.currentTimeMillis()));
            newArticle.setTags(articleDetails.getTags());
            newArticle.setCategory(articleCategory);
            newArticle.setModerated(false);
            articleRepository.save(newArticle);

            ArticlePostResponseDTO response = new ArticlePostResponseDTO();
            response.setId(newArticle.getId());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    public ResponseEntity<?> updateArticle(String authorizationHeader, ArticleEditDTO articleDetails) {
        boolean moderated = false;
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User author = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        if (author.isBanned())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is banned");

        try {
            Optional<Article> optArticle = articleRepository.findById(articleDetails.getId());

            if (optArticle.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Article not found");
            }

            if (author.getId().equals(optArticle.get().getAuthor().getId())) {
                moderated = false;
            } else if (author.getRole() == UserRole.MODERATOR || author.getRole() == UserRole.ADMIN) {
                moderated = true;
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");
            }

            Category articleCategory = categoryRepository.findByName(articleDetails.getCategoryName());
            if (articleCategory == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category not defined");
            }

            articleRepository.updateArticle(articleDetails.getId(), articleDetails.getTitle(),
                    articleDetails.getContent(), articleDetails.getTags(), articleDetails.isPosted(), articleCategory,
                    moderated);

            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated article");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }
}
