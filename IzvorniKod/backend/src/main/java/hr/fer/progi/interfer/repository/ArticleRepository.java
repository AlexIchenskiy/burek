package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // Article findByTitle(String title);

    // Article findByCategory(String category);

}
