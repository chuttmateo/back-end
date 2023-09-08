package tpigrupo2.bacend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tpigrupo2.bacend.security.User.User;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="reservas")
public class Reserva implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private Double precio;
    private int id_curso;

}
