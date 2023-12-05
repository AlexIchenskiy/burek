package hr.fer.progi.interfer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.progi.interfer.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
	
	//@Query("SELECT f FROM Foo f WHERE LOWER(f.name) = LOWER(:name)")
	//Foo retrieveByName(@Param("name") String name);

	List<Article> findByTitle(String title);

	List<Article> findByCategory(String category);
	
	//Article findByAuthor(Long authorid);
}
