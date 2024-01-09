package hr.fer.progi.interfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.CommentPostDTO;
import hr.fer.progi.interfer.service.CommentDeleteService;
import hr.fer.progi.interfer.service.CommentGetService;
import hr.fer.progi.interfer.service.CommentPostService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentPostService commentPostService;

    @Autowired
    private CommentGetService commentGetService;

    @Autowired
    private CommentDeleteService commentDeleteService;

    @PostMapping("/post")
    public ResponseEntity<?> postComment(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody @Valid CommentPostDTO commentDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return commentPostService.post(authorizationHeader, commentDetails);
    }

    @PostMapping("/getAll")
    public ResponseEntity<?> getAllComments(@RequestBody @Valid ArticleGetDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return commentGetService.getAll(articleDetails);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteComment(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody @Valid ArticleGetDTO commentDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return commentDeleteService.delete(authorizationHeader, commentDetails);
    }

}
