package hr.fer.progi.interfer.controller;

import hr.fer.progi.interfer.dto.request.ArticleRatingPostDTO;
import hr.fer.progi.interfer.dto.request.ArticleDeleteDTO;
import hr.fer.progi.interfer.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
import hr.fer.progi.interfer.dto.request.ArticleSearchDTO;
import hr.fer.progi.interfer.dto.request.ArticleEditDTO;
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

    @Autowired
    private ArticleDeleteServiceImpl articleDeleteService;

    @Autowired
    private ArticleRatingGetServiceImpl articleRatingGetService;

    @Autowired
    private ArticleRatingPostServiceImpl articleRatingPostService;

    @Autowired
    private ArticleRatingDeleteServiceImpl articleRatingDeleteService;

    // @Secured("ROLE_USER")
    @PostMapping("/add")
    public ResponseEntity<?> publishArticle(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
    		@RequestBody @Valid ArticlePostDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return articlePostService.addArticle(authorizationHeader, articleDetails);
    }
  
	@GetMapping("/{id}")
    public ResponseEntity<?> getArticle(@PathVariable Long id) {
        return articleGetService.getArticle(id);
    }

	@PostMapping("/getAll")
    public ResponseEntity<?> getAllArticles(@RequestBody @Valid ArticleSearchDTO articleDetails, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
		
	 	return articleGetService.getAllArticles(articleDetails);
	}

    @PostMapping("/update")
    public ResponseEntity<?> updateArticle(@RequestBody @Valid ArticleEditDTO articleDetails, BindingResult bindingResult) {
                if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return articlePostService.updateArticle(articleDetails);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteArticle(@RequestBody @Valid ArticleDeleteDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleDeleteService.deleteArticle(articleDetails);
    }

    // Korisnik želi vidjeti sve ocjene na nekoj objavi
    @GetMapping("/allRatings/{id}")
    public ResponseEntity<?> getArticleRatings(@PathVariable Long id) {

        return articleRatingGetService.getArticleRatings(id);
    }

    // Korisnik želi vidjeti ocjenu koju je ostavio
    @GetMapping("/getRating/{id}")
    public ResponseEntity<?> getArticleRating(@PathVariable Long id) {
    	
        return articleRatingGetService.getArticleRating(id);
    }

    // Korisnik želi ostaviti svoju ocjenu na članak
    @PostMapping("/rating")
    public ResponseEntity<?> addArticleRating(@RequestBody @Valid ArticleRatingPostDTO ratingDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleRatingPostService.addArticleRating(ratingDetails);
    }

    // Korisnik želi ukloniti svoju ocjenu sa članka
    @DeleteMapping("/rating/{id}")
    public ResponseEntity<?> deleteArticleRating(@PathVariable Long id) {

        return articleRatingDeleteService.deleteArticleRating(id);
    }

}
