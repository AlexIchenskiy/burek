package hr.fer.progi.interfer.repository;

import hr.fer.progi.interfer.entity.ArticleRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRatingRepository extends JpaRepository<ArticleRating, Long> {

    Optional<ArticleRating> findByUserIdAndArticleId(Long userId, Long articleId);

    List<ArticleRating> findByArticleId(Long articleId);

}
