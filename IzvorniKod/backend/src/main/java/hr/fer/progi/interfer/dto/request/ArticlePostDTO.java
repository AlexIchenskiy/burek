package hr.fer.progi.interfer.dto.request;

import hr.fer.progi.interfer.dto.request.enums.Category;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticlePostDTO {
	
	@Size(max = 100, message = "{Size.max.user.firstname}")
    @Size(min = 3, message = "{Size.min.user.firstname}")
	private String title;
	
	@Size(max = 100, message = "{Size.max.user.firstname}")
    @Size(min = 3, message = "{Size.min.user.firstname}")
	private String tags;
	
    @Size(min = 3, message = "{Size.min.user.firstname}")
	private String content;
    
    private boolean isPosted;
    
    private Category category;

}
