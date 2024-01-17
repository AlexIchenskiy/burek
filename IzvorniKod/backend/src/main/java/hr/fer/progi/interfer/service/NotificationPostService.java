package hr.fer.progi.interfer.service;

import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import org.springframework.http.ResponseEntity;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import jakarta.validation.Valid;

public interface NotificationPostService {
	
	ResponseEntity<?> send(String authorizationHeader, @Valid NotificationPostDTO notificationDetails);

	ResponseEntity<?> requestModifyArticle(long id, @Valid ArticlePostDTO articleDetails);

	ResponseEntity<?> reportArticle(String authorizationHeader, @Valid NotificationReportDTO notificationDetails);

	ResponseEntity<?> reportComment(String authorizationHeader, @Valid NotificationReportDTO notificationDetails);

}
