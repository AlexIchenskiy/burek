package hr.fer.progi.interfer.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticlePostDTO {

    @Size(max = 100, message = "{Size.max.article.title}")
    @Size(min = 3, message = "{Size.min.article.title}")
	private String title;

    @Size(max = 100, message = "{Size.max.article.tags}")
    @Size(min = 3, message = "{Size.min.article.tags}")
    private String tags;

    @Column(columnDefinition = "TEXT")
    @Size(min = 3, message = "{Size.min.article.content}")
    @Size(max = 65000, message = "{Size.max.article.content}")
	private String content;
  
    private boolean posted;
    

    private String categoryName;

}
