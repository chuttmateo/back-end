package tpigrupo2.bacend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImagenesDTO {
    private int id;
    private String image;
    private String ruta;
}
