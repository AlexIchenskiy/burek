package hr.fer.progi.interfer.service.impl;

import hr.fer.progi.interfer.dto.request.ArticleGetDTO;
import hr.fer.progi.interfer.dto.response.AllRatingsDTO;
import hr.fer.progi.interfer.entity.ArticleRating;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.repository.ArticleRatingRepository;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.ArticleRatingGetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticleRatingGetServiceImpl implements ArticleRatingGetService {

    @Autowired
    ArticleRatingRepository articleRatingRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<?> getArticleRatings(ArticleGetDTO articleDetails) {
        if (articleRepository.findById(articleDetails.getId()).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(articleDetails);

        AllRatingsDTO allRatings = new AllRatingsDTO();

        for (ArticleRating articleRating : articleRatingRepository.findByArticleId(articleDetails.getId())) {
            switch (articleRating.getRating()) {
                case 1 -> allRatings.setRating1(allRatings.getRating1() + 1);
                case 2 -> allRatings.setRating2(allRatings.getRating2() + 1);
                case 3 -> allRatings.setRating3(allRatings.getRating3() + 1);
                case 4 -> allRatings.setRating4(allRatings.getRating4() + 1);
                case 5 -> allRatings.setRating5(allRatings.getRating5() + 1);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(allRatings);
    }

    @Override
    public ResponseEntity<?> getArticleRating(ArticleGetDTO articleDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail((String) authentication.getPrincipal());

        // Ovo mi ne izgleda kao da bi trebalo fail-ati, obzirom da bilo tko - tko nije
        // prijavljen - ionako nema pristup, ali Anton uvijek biva paranoičan
        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user information");
        if (articleRepository.findById(articleDetails.getId()).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(articleDetails);

        Optional<ArticleRating> articleRating = articleRatingRepository.findByUserIdAndArticleId(user.getId(),
                articleDetails.getId());

        if (articleRating.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(String.format("{\"articleId\":%d,\"userId\":%d}", articleDetails.getId(), user.getId()));

        return ResponseEntity.status(HttpStatus.OK).body(articleRating.get());
    }

}
