package hr.fer.progi.interfer.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSearchDTO {
	
	private String category;
	private String title;
	private String author;
	private String content; //pazi da ne pukne kad pretrazujemo s vise od 20 znakova (varchar limit), onemogući predugačke upite
	private String tags;
	private int page;
	//private String sortAttribute;
}
