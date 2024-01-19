package hr.fer.progi.interfer.controller;

import hr.fer.progi.interfer.dto.request.CommentContentDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.interfer.dto.request.NotificationPostDTO;
import hr.fer.progi.interfer.dto.request.NotificationReportDTO;
import hr.fer.progi.interfer.service.NotificationDeleteService;
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
	
	@Autowired
	private NotificationDeleteService notificationDeleteService;
	
	@GetMapping("/get")
    public ResponseEntity<?> getNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return notificationGetService.getAll(authorizationHeader);
    }
	
	@GetMapping("/get/sent")
    public ResponseEntity<?> getSentNotifications(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return notificationGetService.getAllSent(authorizationHeader);
    }
	
	@GetMapping("/get/{id}")
    public ResponseEntity<?> getNotification(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable Long id) {
        return notificationGetService.get(authorizationHeader, id);
    }
	
	@PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, 
    		@RequestBody @Valid NotificationPostDTO notificationDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Failed data validation");
        }
        return notificationPostService.send(authorizationHeader, notificationDetails);
    }

    @PostMapping("/requestChange/comment/{id}")
    public ResponseEntity<?> requestModifyComment(@PathVariable long id, @RequestBody @Valid CommentContentDTO commentDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body("Failed data validation");

        return notificationPostService.requestModifyComment(id, commentDetails);
    }

    @PostMapping("/requestChange/article/{id}")
    public ResponseEntity<?> requestModifyArticle(@PathVariable long id, @RequestBody @Valid ArticlePostDTO articleDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return  ResponseEntity.badRequest().body("Failed data validation");

        return notificationPostService.requestModifyArticle(id, articleDetails);
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
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComment(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @PathVariable Long id) {

        return notificationDeleteService.delete(authorizationHeader, id);
    }
	
}
