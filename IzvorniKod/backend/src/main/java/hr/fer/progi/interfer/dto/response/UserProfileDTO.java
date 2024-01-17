package hr.fer.progi.interfer.dto.response;

import java.sql.Timestamp;
import java.util.List;

import hr.fer.progi.interfer.entity.UserRole;
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
public class UserProfileDTO {
	
	@Getter
	@Setter
	@AllArgsConstructor
	public static class ArticleDTO {
		private Long id;
		private String title;
	    private String tags;
		private String content;
	    private String categoryName;
		private Timestamp datePublished;
	}

    private String firstname;

    private String lastname;

    private String email;

    private UserRole role;
    
    private List<ArticleDTO> savedArticles;
    
    private List<ArticleDTO> publishedArticles;

}

