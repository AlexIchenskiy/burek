package hr.fer.progi.interfer.dto.response;

import java.sql.Timestamp;
import java.util.List;

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
public class ArticleSearchResponseDTO {

    @Getter
	@Setter
	@AllArgsConstructor
    public static class ArticleDTO {

    	private Long id;
        private String title;
        private Long authorid;
        private String author;
        private String tags;
        private String content;
        private boolean posted;
        private Timestamp datePublished;
	    private String categoryName;
	}
    private int totalPages;
	private List<ArticleDTO> articlePage;
    
}
