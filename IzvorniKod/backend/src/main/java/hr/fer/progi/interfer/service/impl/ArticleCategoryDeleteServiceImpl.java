package hr.fer.progi.interfer.service.impl;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleCategoryPostDTO;
import hr.fer.progi.interfer.service.ArticleCategoryDeleteService;

public class ArticleCategoryDeleteServiceImpl implements ArticleCategoryDeleteService{

    @Override
    public ResponseEntity<?> deleteCategory(String authorizationHeader, ArticleCategoryPostDTO articleDetails) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteCategory'");
    }
    
}
