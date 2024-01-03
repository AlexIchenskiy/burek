package hr.fer.progi.interfer.controller;

import hr.fer.progi.interfer.dto.request.ArticleRatingPostDTO;
import hr.fer.progi.interfer.dto.request.ArticleDeleteDTO;
import hr.fer.progi.interfer.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.request.ArticlePostDTO;
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
    public ResponseEntity<?> publishArticle(@RequestBody @Valid ArticlePostDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return articlePostService.addArticle(articleDetails);
    }

    @PostMapping("/id") // Zašto PostMapping?
    public ResponseEntity<?> getArticle(@RequestBody @Valid ArticleGetDTO articleDetails, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.toString());
        }
        return articleGetService.getArticle(articleDetails);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllArticles(@RequestHeader HttpHeaders header) {
        return articleGetService.getAllArticles();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteArticle(@RequestBody @Valid ArticleDeleteDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleDeleteService.deleteArticle(articleDetails);
    }

    // Korisnik želi vidjeti sve ocjene na nekoj objavi
    @PostMapping("/allRatings")
    public ResponseEntity<?> getArticleRatings(@RequestBody @Valid ArticleGetDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleRatingGetService.getArticleRatings(articleDetails);
    }

    // Korisnik želi vidjeti ocjenu koju je ostavio
    @PostMapping("/getRating")
    public ResponseEntity<?> getArticleRating(@RequestBody @Valid ArticleGetDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleRatingGetService.getArticleRating(articleDetails);
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
    @DeleteMapping("/rating")
    public ResponseEntity<?> deleteArticleRating(@RequestBody @Valid ArticleGetDTO articleDetails,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseEntity.badRequest().body(bindingResult.toString());

        return articleRatingDeleteService.deleteArticleRating(articleDetails);
    }

}
