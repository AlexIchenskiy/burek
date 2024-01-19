package hr.fer.progi.interfer.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.dto.response.CommentGetDTO;
import hr.fer.progi.interfer.entity.Article;
import hr.fer.progi.interfer.entity.Comment;
import hr.fer.progi.interfer.repository.ArticleRepository;
import hr.fer.progi.interfer.repository.CommentRepository;
import hr.fer.progi.interfer.service.CommentGetService;

@Service
public class CommentGetServiceImpl implements CommentGetService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public ResponseEntity<?> getAll(Long id) {

        try {
            Article article = articleRepository.findById(id).get();

            List<CommentGetDTO> allComments = commentRepository.findByArticle(article)
                    .stream()
                    .map(this::convertToDTO).sorted((o1, o2) -> o1.getTimestamp().compareTo(o2.getTimestamp()))
                    .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(allComments);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong article ID");
        }

    }

    private CommentGetDTO convertToDTO(Comment comment) {
        CommentGetDTO commentDTO = new CommentGetDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setContent(comment.getContent());
        commentDTO.setAuthor(comment.getAuthor().getFirstName() + " " + comment.getAuthor().getLastName());
        commentDTO.setAuthorId(comment.getAuthor().getId());
        commentDTO.setAuthorRole(comment.getAuthor().getRole().toString());
        commentDTO.setTimestamp(comment.getDatePublished().toLocalDateTime());
        return commentDTO;
    }

}
