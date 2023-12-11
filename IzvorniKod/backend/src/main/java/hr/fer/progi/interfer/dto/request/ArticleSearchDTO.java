package hr.fer.progi.interfer.dto.request;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSearchDTO {
	
	private String category;
	private String title;
	
}
