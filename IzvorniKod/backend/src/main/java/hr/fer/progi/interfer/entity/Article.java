package hr.fer.progi.interfer.entity;

import java.sql.Timestamp;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;
    
    @Column(nullable=false)
    private String content;

    @Column(nullable=false)
    private Boolean published;

    @Column(nullable=false)
    private Timestamp datePublished;
    
    @Column(nullable=false)
    private String tags;
    
    @Column(nullable=false)
    private boolean moderated = false;
    
}
