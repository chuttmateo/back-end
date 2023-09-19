package tpigrupo2.bacend.service;

import tpigrupo2.bacend.model.Calificaciones_Producto;

import java.util.List;

public interface ICalificaciones_ProductoService {

    List<Calificaciones_Producto> listarCalificaciones();

    Calificaciones_Producto crearCalificacion(Calificaciones_Producto calificacion);
}
