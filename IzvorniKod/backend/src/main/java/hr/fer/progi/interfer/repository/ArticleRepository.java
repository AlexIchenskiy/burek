package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Modifying
    @Query("update Article a set a.title = ?1, a.content = ?2, a.category = ?3, a.tags = ?4, a.published = ?5 where a.id = ?6" )
    void updateArticle(String title, String content, String category, String tags, boolean published, Long id);
}
