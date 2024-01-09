package hr.fer.progi.interfer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByArticle(Article article);

}
