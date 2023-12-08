package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import jakarta.validation.Valid;

public interface CommentGetService {

	ResponseEntity<?> getAll(@Valid ArticleGetDTO articleDetails);

}