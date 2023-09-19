package tpigrupo2.bacend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpigrupo2.bacend.dto.CalificacionDTO;
import tpigrupo2.bacend.dto.Producto_FavoritoDTO;
import tpigrupo2.bacend.model.Calificaciones_Producto;
import tpigrupo2.bacend.model.Categoria;
import tpigrupo2.bacend.model.Producto;
import tpigrupo2.bacend.model.Producto_Favorito;
import tpigrupo2.bacend.security.User.User;
import tpigrupo2.bacend.service.ICalificaciones_ProductoService;
import tpigrupo2.bacend.service.ICaracteristicaService;
import tpigrupo2.bacend.service.IProductoService;
import tpigrupo2.bacend.service.IUserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/puntuaciones")
public class CalificacionesController {

    @Autowired
    ICalificaciones_ProductoService calificaciones_service;
    @Autowired
    IUserService userService;
    @Autowired
    IProductoService productoService;

    @CrossOrigin("*")
    @GetMapping
    public List<CalificacionDTO> listarPuntuaciones(){
        List<Calificaciones_Producto> calificaciones = calificaciones_service.listarCalificaciones();
        List<CalificacionDTO> calificacionesDTO;

        calificacionesDTO = calificaciones.stream().map(elemento -> {
            CalificacionDTO calificacionFinal = new CalificacionDTO(elemento.getUsuario().getUsername(), elemento.getProducto().getId(), elemento.getCalificacion(), elemento.getComentario(), elemento.getFechaCalificacion());
            return calificacionFinal;
        }).toList();

         return calificacionesDTO;
    }


    @CrossOrigin("*")
    @PostMapping
    public ResponseEntity<?> agregarCalificacion(@RequestBody CalificacionDTO calificacion){

        try {
        User usuario = userService.buscarUsuario(calificacion.getUsername());
        Producto producto = productoService.buscarProducto(calificacion.getIdProducto());

        Calificaciones_Producto cf = new Calificaciones_Producto(
                0,
                usuario,
                producto,
                calificacion.getCalificacion(),
                calificacion.getComentario(),
                calificacion.getFechaCalificacion()
        );

        calificaciones_service.crearCalificacion(cf);

            return ResponseEntity.ok("Agregado correctamente" );

        }catch (Exception exception){
            return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
}
