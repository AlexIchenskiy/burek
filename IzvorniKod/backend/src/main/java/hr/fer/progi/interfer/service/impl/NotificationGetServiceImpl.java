package hr.fer.progi.interfer.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.service.NotificationGetService;

@Service
public class NotificationGetServiceImpl implements NotificationGetService{

	@Override
	public ResponseEntity<?> getAll(String authorizationHeader) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<?> getAllSent(String authorizationHeader) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<?> get(String authorizationHeader, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
