package hr.fer.progi.interfer.dto.response;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleCategoryGetResponseDTO {

    @Getter
	@Setter
	@AllArgsConstructor
    public static class CategoryDTO {
    Long id;
    String name;
    int articleCount;
    }
    List<CategoryDTO> categories;
}
