package hr.fer.progi.interfer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {



	//@Query(value = "SELECT * FROM articles WHERE category = ?1 AND title = ?2", nativeQuery = true)
	List<Article> findByCategoryAndTitle(String category, String title);
	

	List<Article> findByTitle(String title);

	List<Article> findByCategory(String category);

	//Article findByAuthor(Long authorid);
}
