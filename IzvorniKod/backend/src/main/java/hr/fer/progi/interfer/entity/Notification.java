package hr.fer.progi.interfer.entity;

import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "notifications")
public class Notification {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
    @JoinColumn(name = "from_user_id", referencedColumnName = "id")
    private User from;

    @ManyToMany
    @JoinTable(
            name = "notification_recipients",
            joinColumns = @JoinColumn(name = "notification_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> to;
	
	@Column(nullable = false)
	private String subject;
	 
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;
	
	@Column(nullable = false)
    private Timestamp dateSent;
	
	@Column(nullable = false)
	private Boolean seen;
	
	private Long reportId;

}
