package hr.fer.progi.interfer.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPromotionDTO {

    private long id;

    // Opredijelio sam se ulogu primiti u obliku String-a
    // Ako frontend-u više odgovara slati u obliku broja, promijenit ću
    private String role;

}
