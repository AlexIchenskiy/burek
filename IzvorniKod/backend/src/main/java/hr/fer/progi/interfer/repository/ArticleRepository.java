package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;
import jakarta.transaction.Transactional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Article a set a.title = ?2, a.content = ?3, a.category = ?4, a.tags = ?5, a.published = ?6 where a.id = ?1" )
    void updateArticle(Long id, String title, String content, String category, String tags, boolean published);

}