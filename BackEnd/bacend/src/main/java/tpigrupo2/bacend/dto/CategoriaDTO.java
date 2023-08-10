package tpigrupo2.bacend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoriaDTO {
    private int id;
    private String nombre;
    private String descripcion;
}
