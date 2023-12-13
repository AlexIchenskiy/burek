package hr.fer.progi.interfer.dto.response;

import hr.fer.progi.interfer.entity.UserRole;
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
public class UserDetailsDTO {

    private String firstname;

    private String lastname;

    private String email;

    private UserRole role;

}
