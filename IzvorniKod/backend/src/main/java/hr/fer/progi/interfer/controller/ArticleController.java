package hr.fer.progi.interfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import hr.fer.progi.interfer.service.impl.ArticlePostServiceImpl;
import hr.fer.progi.interfer.service.impl.ArticleGetServiceImpl;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/posts")
public class ArticleController {
	
	@Autowired
    private ArticlePostServiceImpl articlePostService;
	
	@Autowired
    private ArticleGetServiceImpl articleGetService;
	
	@PostMapping("/add")
    public ResponseEntity<?> publishArticle(@RequestBody @Valid ArticlePostDTO articleDetails, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
    	return articlePostService.addArticle(articleDetails);
    }

	@GetMapping("/id")
    public ResponseEntity<?> getArticle(@RequestBody @Valid ArticleGetDTO articleDetails, BindingResult bindingResult) {

        return articleGetService.getArticle(articleDetails);
    }

	@GetMapping("/getAll")
    public ResponseEntity<?> getAllArticles(@RequestHeader HttpHeaders header) {
    	return ResponseEntity.ok().body("Article");		//nije implementirano do kraja, za test
    }


}
