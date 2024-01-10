package hr.fer.progi.interfer.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
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
public class NotificationReportDTO {
	
	private Long article_id;

    @Column(columnDefinition = "TEXT")
    @Size(min = 3, message = "{Size.min.article.content}")
    @Size(max = 1000, message = "{Size.min.article.content}")
    private String reason;

}
