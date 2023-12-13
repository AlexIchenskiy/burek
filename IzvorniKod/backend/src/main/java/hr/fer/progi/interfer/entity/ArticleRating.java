package hr.fer.progi.interfer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "article_ratings", uniqueConstraints = { @UniqueConstraint(columnNames = {"userId", "articleId" }) })
public class ArticleRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ocjena bi trebala imati vezu s korisnikom koji ju je ostavio i sa člankom koji je ocijenjen
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long articleId;

    @Column(nullable = false)
    @Min(value = 1)
    @Max(value = 5)
    private int rating;
}
