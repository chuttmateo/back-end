package tpigrupo2.bacend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Set;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="users")
public class User {
    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String name;
    private String apellido;
    private String password;
    private String email;


    private boolean admin;


}
