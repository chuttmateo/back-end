package tpigrupo2.bacend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Calificaciones_Producto;
import tpigrupo2.bacend.repository.ICalificaciones_Producto;
import tpigrupo2.bacend.repository.ICaracteristicaRepository;
import tpigrupo2.bacend.service.ICalificaciones_ProductoService;

import java.util.List;

@Service
public class Calificaciones_ProductoService implements ICalificaciones_ProductoService {

    @Autowired
    private ICalificaciones_Producto iCalificaciones_ProductoRepository;

    @Override
    public List<Calificaciones_Producto> listarCalificaciones() {
        return iCalificaciones_ProductoRepository.findAll();
    }

    @Override
    public Calificaciones_Producto crearCalificacion(Calificaciones_Producto calificacion) {
        return iCalificaciones_ProductoRepository.save(calificacion);
    }
}
