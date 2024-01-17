package hr.fer.progi.interfer.service;

import org.springframework.http.ResponseEntity;

public interface NotificationDeleteService {

	ResponseEntity<?> delete(String authorizationHeader, Long id);

}
