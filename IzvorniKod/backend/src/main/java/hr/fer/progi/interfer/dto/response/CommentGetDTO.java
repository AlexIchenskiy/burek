package hr.fer.progi.interfer.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentGetDTO {

    private Long id;
    private String author;
    private Long authorId;
    private String authorRole;
    private String content;
    private LocalDateTime timestamp;

}
