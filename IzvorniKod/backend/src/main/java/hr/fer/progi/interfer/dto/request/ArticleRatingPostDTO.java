package hr.fer.progi.interfer.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleRatingPostDTO {

    private Long articleId;

    @Min(value = 1)
    @Max(value = 5)
    private int rating;

}
