package tpigrupo2.bacend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.model.Categoria;
import tpigrupo2.bacend.service.ICategoriaService;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    ICategoriaService categoriaService;

    @CrossOrigin("*")
    @GetMapping
    public List<Categoria> listarCategorias(){
        Collection<Categoria> categorias = categoriaService.listarCategorias();
        return categorias.stream().toList();
    }

    @CrossOrigin("*")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarCategoria(@PathVariable Integer id){
        Categoria categoria = categoriaService.buscarCategoria(id);
        if(categoria != null){
            return new ResponseEntity<Categoria>(categoria, HttpStatus.OK);
        }

        return new ResponseEntity<String>("Categoria no encontrada", HttpStatus.NOT_FOUND);
    }

    @CrossOrigin("*")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Integer id){
        if (categoriaService.eliminarCategoria(id)){
            return ResponseEntity.ok("Categoria eliminada correctamente");
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<String> crearCategoria(@RequestBody Categoria categoriaRequest) {
        Categoria c = categoriaService.buscarPorNombre(categoriaRequest.getNombre());
        if(c != null){
            return ResponseEntity.badRequest().body("Nombre de Categoria existente");
        }
        try {
            categoriaService.crearCategoria(categoriaRequest);

            return ResponseEntity.ok("Categoria creada correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el categoria.");
        }
    }

}
