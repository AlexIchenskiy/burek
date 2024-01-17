package hr.fer.progi.interfer.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEditDTO {

    // Must be longer than 2 characters, shorter than 60 characters and contain only
    // letters, "-" and " "
    @Size(max = 60, message = "{Size.max.user.firstname}")
    @Size(min = 2, message = "{Size.min.user.firstname}")
    @Pattern(regexp = "^[a-zA-Z- ČĆŠĐŽčćšđž]+$", message = "{Pattern.user.firstname}")
    private String firstname;

    // Must be longer than 2 characters, shorter than 60 characters and contain only
    // letters, "-" and " "
    @Size(max = 60, message = "{Size.max.user.lastname}")
    @Size(min = 2, message = "{Size.min.user.lastname}")
    @Pattern(regexp = "^[a-zA-Z- ČĆŠĐŽčćšđž]+$", message = "{Pattern.user.lastname}")
    private String lastname;

    // some special chars
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE, message = "{Email.user.email}")
    private String email;

}
