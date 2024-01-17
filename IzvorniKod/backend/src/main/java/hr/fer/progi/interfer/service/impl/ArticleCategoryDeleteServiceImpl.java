package hr.fer.progi.interfer.service.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import hr.fer.progi.interfer.dto.request.ArticleCategoryPostDTO;
import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.entity.UserRole;
import hr.fer.progi.interfer.service.ArticleCategoryDeleteService;
import hr.fer.progi.interfer.repository.CategoryRepository;
import hr.fer.progi.interfer.repository.UserRepository;


public class ArticleCategoryDeleteServiceImpl implements ArticleCategoryDeleteService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> deleteCategory(String authorizationHeader, ArticleCategoryPostDTO articleDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User requestingUser = userRepository.findByEmail((String) authentication.getPrincipal());

        if (requestingUser == null)
            return ResponseEntity.internalServerError().body("Error getting user information");
        if ((requestingUser.getRole() != UserRole.ADMIN) && (requestingUser.getRole() != UserRole.MODERATOR)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only moderators can perform this action");
        }

        try {
            categoryRepository.deleteByName(articleDetails.getName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return null;
    }
    
}
