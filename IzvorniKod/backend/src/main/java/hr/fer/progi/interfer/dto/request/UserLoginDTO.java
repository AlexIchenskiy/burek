package hr.fer.progi.interfer.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoginDTO {

    // some special chars
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE, message = "{Email.user.email}")
    private String email;

    // Must be longer than 7 characters, shorter than 60 characters and have at
    // least one number and one letter
    @Size(max = 60, message = "{Size.max.user.password}")
    @Size(min = 7, message = "{Size.min.user.password}")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).+$", message = "{Pattern.user.password}")
    private String password;

}
