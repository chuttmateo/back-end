package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    Integer id;
    String username;
    String lastname;
    String firstname;
    String role;
}
