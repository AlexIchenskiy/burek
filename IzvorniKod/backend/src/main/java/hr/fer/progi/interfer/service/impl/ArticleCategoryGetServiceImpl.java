package hr.fer.progi.interfer.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.service.ArticleCategoryGetService;
import hr.fer.progi.interfer.dto.response.ArticleCategoryGetResponseDTO;
import hr.fer.progi.interfer.entity.Category;
import hr.fer.progi.interfer.repository.CategoryRepository;

@Service
public class ArticleCategoryGetServiceImpl implements ArticleCategoryGetService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<?> getAll() {

    try {
       List<Category> categories = categoryRepository.findAll();
       ArticleCategoryGetResponseDTO response = new ArticleCategoryGetResponseDTO();

       response.setCategories(categories.stream().map(c -> new ArticleCategoryGetResponseDTO.CategoryDTO(c.getId(), c.getName(), c.getArticleCount())).toList());  

       return ResponseEntity.status(HttpStatus.OK).body(response);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
    
    }
    
}
