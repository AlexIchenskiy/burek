package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Category;
import jakarta.transaction.Transactional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Article a set a.title = ?2, a.content = ?3, a.tags = ?4, a.published = ?5 where a.id = ?1" )
    void updateArticle(Long id, String title, String content, String tags, Boolean published);

    Long countByCategoryAndPublished(Category c, boolean b);

    Long countByModeratedAndPublished(boolean b, boolean c);

    Long countByPublished(boolean b);

}