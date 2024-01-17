package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.ArticleCategoryPostDTO;
import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.service.ArticleCategoryPostService;
import hr.fer.progi.interfer.repository.CategoryRepository;
import hr.fer.progi.interfer.repository.UserRepository;

@Service
public class ArticleCategoryPostServiceImpl implements ArticleCategoryPostService{


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> addCategory(String authorizationHeader, ArticleCategoryPostDTO articleDetails) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User requestingUser = userRepository.findByEmail((String) authentication.getPrincipal());

        if (requestingUser == null)
            return ResponseEntity.internalServerError().body("Error getting user information");
        if (!((requestingUser.getRole() == UserRole.ADMIN) || (requestingUser.getRole() == UserRole.MODERATOR))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only moderators can perform this action");
        }

        try {
            Category category = new Category();
            category.setName(articleDetails.getName());
            category.setArticleCount(0);
            categoryRepository.save(category);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Added article");
    }


    
}