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

    @GeneratedValue

    private Long id;

    private String name;

    private String password;



    @ManyToMany(fetch=FetchType.EAGER)

    @JoinTable(

            name="UserRoles",

            joinColumns = @JoinColumn(name ="id_user"),

            inverseJoinColumns = @JoinColumn(name="id_rol")

    )

    private Set<Rol> roles;
}
