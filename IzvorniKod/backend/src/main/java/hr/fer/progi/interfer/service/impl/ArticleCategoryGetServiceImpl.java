package hr.fer.progi.interfer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.service.ArticleCategoryGetService;
import hr.fer.progi.interfer.repository.CategoryRepository;


public class ArticleCategoryGetServiceImpl implements ArticleCategoryGetService{
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> getAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAll'");
    }
    
    
}
