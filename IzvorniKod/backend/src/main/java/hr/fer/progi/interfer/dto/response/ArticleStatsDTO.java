package hr.fer.progi.interfer.dto.response;

import java.util.List;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleStatsDTO {
    
    @Getter
	@Setter
	@AllArgsConstructor
    public static class CategoryDTO
    {
        String name;
        Long numberOfarticles;
    }
    
    Long totalArticles;
    Long moderatedArticles;
    List<CategoryDTO> byCategory;

}
