package hr.fer.progi.interfer.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllRatingsDTO {

    private int rating1;
    private int rating2;
    private int rating3;
    private int rating4;
    private int rating5;

}
