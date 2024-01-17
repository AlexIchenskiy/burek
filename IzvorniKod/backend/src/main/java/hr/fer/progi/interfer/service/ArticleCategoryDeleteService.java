package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleCategoryPostDTO;

public interface ArticleCategoryDeleteService {

    ResponseEntity<?> deleteCategory(String authorizationHeader, ArticleCategoryPostDTO articleDetails);

}
