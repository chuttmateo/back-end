package tpigrupo2.bacend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.ProductoDTO;
import tpigrupo2.bacend.model.Imagenes;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.service.IProductoService;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final IProductoService productoService;

    public SearchController(IProductoService productoService) {
        this.productoService = productoService;
    }

    @CrossOrigin("*")
    @GetMapping
    public List<ProductoDTO> search(@RequestParam HashMap<String, String> params){

        String nombre = params.getOrDefault("nombre", "_");

        Collection<Producto> productos = productoService.listarProductos();

        return productos.stream()
                .filter(producto -> producto.getNombre().startsWith(nombre))
                .map(producto -> {
            Optional<String> primeraImagen = producto.getImagenes().stream()
                    .map(Imagenes::getRuta)
                    .findFirst();

            return new ProductoDTO(
                    producto.getId(),
                    producto.getNombre(),
                    primeraImagen.orElse("NO HAY IMAGEN"),
                    producto.getDescripcion(),
                    producto.getCategoria() !=null ? producto.getCategoria().getNombre():""
            );
        }).toList();
    }

}
