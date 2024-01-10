package hr.fer.progi.interfer.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import hr.fer.progi.interfer.service.NotificationPostService;
import jakarta.validation.Valid;

@Service
public class NotificationPostServiceImpl implements NotificationPostService{

	@Override
	public ResponseEntity<?> send(String authorizationHeader, @Valid NotificationPostDTO notificationDetails) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<?> reportArticle(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<?> reportComment(String authorizationHeader,
			@Valid NotificationReportDTO notificationDetails) {
		// TODO Auto-generated method stub
		return null;
	}

}
