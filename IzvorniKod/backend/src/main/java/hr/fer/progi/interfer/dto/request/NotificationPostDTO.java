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
public class NotificationPostDTO {
	
	
	
    @Size(max = 100, message = "{Size.max.article.title}")
    @Size(min = 3, message = "{Size.min.article.title}")
	private String subject;

    @Column(columnDefinition = "TEXT")
    @Size(min = 3, message = "{Size.min.notification.content}")
    @Size(max = 5000, message = "{Size.max.notification.content}")
	private String content;

}
