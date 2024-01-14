package hr.fer.progi.interfer.dto.response;

import java.time.LocalDateTime;

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
public class NotificationDTO {
	
	private Long id;
	
    private String from;
    
    private Long userId;
    
    private String userRole;
    
    private String subject;
    
    private String content;
    
    private LocalDateTime timestamp;
	
    private boolean seen;
}
