package hr.fer.progi.interfer.service.impl;

import java.util.Optional;

import hr.fer.progi.interfer.entity.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import hr.fer.progi.interfer.entity.Comment;
import hr.fer.progi.interfer.entity.User;
import hr.fer.progi.interfer.jwt.JwtUtil;
import hr.fer.progi.interfer.repository.CommentRepository;
import hr.fer.progi.interfer.repository.UserRepository;
import hr.fer.progi.interfer.service.CommentDeleteService;

@Service
public class CommentDeleteServiceImpl implements CommentDeleteService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public ResponseEntity<?> delete(String authorizationHeader, Long id) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access denied");

        User user = userRepository.findByEmail(jwtUtil.getEmailFromToken(authorizationHeader.substring(7)));

        // Obzirom da repozitorij vraća Optional<Comment> vrijednost, mislim da je poželjnije odmah provjeravati njeno
        // postojanje nego oslanjati se na Exception
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong comment ID");

        User author = comment.get().getAuthor();

        if (!author.getId().equals(user.getId()) && user.getRole() == UserRole.STUDENT)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("The user is not authorized to delete the comment");

        commentRepository.delete(comment.get());

        return ResponseEntity.status(HttpStatus.OK).body("Comment deleted");
    }

}
