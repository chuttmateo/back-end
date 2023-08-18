package tpigrupo2.bacend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.ProductoDTO;
import tpigrupo2.bacend.model.Categoria;
import tpigrupo2.bacend.model.Detalle_Producto;
import tpigrupo2.bacend.model.Imagenes;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.service.ICategoriaService;
import tpigrupo2.bacend.service.IProductoService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    IProductoService productoService;

    @Autowired
    ICategoriaService categoriaService;

    @CrossOrigin("*")
    @GetMapping
    public List<ProductoDTO> listarProductos(){

        Collection<Producto> productos = productoService.listarProductos();

        return productos.stream().map(producto -> {
            Optional<String> primeraImagen = producto.getImagenes().stream()
                    .map(Imagenes::getRuta)
                    .findFirst();

/*            Optional<String> primerDetalle = producto.getDetalles().stream()
                    .map(Detalle_Producto::getDescripcion)
                    .findFirst();*/

            return new ProductoDTO(
                    producto.getId(),
                    producto.getNombre(),
                    primeraImagen.orElse("NO HAY IMAGEN"),
                    producto.getDescripcion(),
                    producto.getCategoria() !=null ? producto.getCategoria().getNombre():""
            );
        }).toList();

    }
    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarProducto(@PathVariable Integer id){
        Producto producto = productoService.buscarProducto(id);
        if(producto != null){
            return new ResponseEntity<Producto>(producto, HttpStatus.OK);
        }

        return new ResponseEntity<String>("Producto no encontrado", HttpStatus.NOT_FOUND);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id){
        if (productoService.eliminarProducto(id)){
            return ResponseEntity.ok("Producto eliminado correctamente");
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<String> crearProducto(@RequestBody Producto productoRequest) {
        Producto p = productoService.buscarPorNombre(productoRequest.getNombre());
        if(p != null){
            return ResponseEntity.badRequest().body("Nombre de Producto existente");
        }
        try {
            System.out.println("Tratando de crear un producto");
            Producto nuevoProducto = new Producto();
            nuevoProducto.setNombre(productoRequest.getNombre());
            nuevoProducto.setCategoria(productoRequest.getCategoria());

            for (Detalle_Producto detalleRequest : productoRequest.getDetalles()) {
                Detalle_Producto detalleProducto = new Detalle_Producto();
                detalleProducto.setDescripcion(detalleRequest.getDescripcion());
                detalleProducto.setPrecio(detalleRequest.getPrecio());
                nuevoProducto.getDetalles().add(detalleProducto);
            }

            for (Imagenes imagenRequest : productoRequest.getImagenes()) {
                byte[] imageBytes = java.util.Base64.getDecoder().decode(imagenRequest.getImage());
                Imagenes imagen = new Imagenes();
                try {
                    String imageName = UUID.randomUUID().toString() + ".jpg";
                    File imageFile = new File("/var/www/html/images/" + imageName);
                    imageFile.createNewFile();
                    FileOutputStream fos = new FileOutputStream(imageFile);
                    fos.write(imageBytes);
                    fos.close();
                    imagen.setRuta("http://3.144.46.39/images/"+imageName);
                    nuevoProducto.getImagenes().add(imagen);
                } catch (IOException e) {
                    e.printStackTrace(); // para agregar a Logs
                }
            }

            productoService.crearProducto(nuevoProducto);

            return ResponseEntity.ok("Producto creado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el producto.");
        }

    }
    @CrossOrigin("*")
    @PutMapping("/modcat")
    public ResponseEntity<String> ModificarProducto(@RequestBody Producto productoRequest) {
        Producto p = productoService.buscarProducto(productoRequest.getId());
        if(p == null){
            return ResponseEntity.badRequest().body("El Producto no existe");
        }
        try {
            p.setCategoria(productoRequest.getCategoria());
            productoService.editarProducto(p);
            return ResponseEntity.ok("Producto modificado correctamente.");
        }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el producto."+ e.getMessage());
        }
    }


}
