package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface CommentGetService {

    ResponseEntity<?> getAll(Long id);

}
