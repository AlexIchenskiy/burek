package hr.fer.progi.interfer.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentContentDTO {

    @Column(columnDefinition = "TEXT")
    @Size(min = 3, message = "{Size.min.article.content}")
    @Size(max = 5000, message = "{Size.min.article.content}")
    private String content;

}
