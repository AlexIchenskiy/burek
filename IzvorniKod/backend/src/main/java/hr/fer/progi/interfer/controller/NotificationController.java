package hr.fer.progi.interfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import hr.fer.progi.interfer.service.NotificationGetService;
import hr.fer.progi.interfer.service.NotificationPostService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
	
	@Autowired
	private NotificationGetService notificationGetService;
	
	@Autowired
	private NotificationPostService notificationPostService;
	
	@GetMapping("/get")
    public ResponseEntity<?> getNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return notificationGetService.get(authorizationHeader);
    }
	
	@GetMapping("/get/sent")
    public ResponseEntity<?> getSentNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return notificationGetService.get(authorizationHeader);
    }
	
	@PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, 
    		@RequestBody @Valid NotificationPostDTO notificationDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Failed data validation");
        }
        return notificationPostService.send(authorizationHeader, notificationDetails);
    }
	
	@PostMapping("/report/article")
    public ResponseEntity<?> reportArticle(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, 
    		@RequestBody @Valid NotificationReportDTO notificationDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Failed data validation");
        }
        return notificationPostService.reportArticle(authorizationHeader, notificationDetails);
    }
	
	@PostMapping("/report/comment")
    public ResponseEntity<?> reportComment(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, 
    		@RequestBody @Valid NotificationReportDTO notificationDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Failed data validation");
        }
        return notificationPostService.reportComment(authorizationHeader, notificationDetails);
    }
	
	
	

}
