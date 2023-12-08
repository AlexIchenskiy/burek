package hr.fer.progi.interfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.interfer.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	

}
