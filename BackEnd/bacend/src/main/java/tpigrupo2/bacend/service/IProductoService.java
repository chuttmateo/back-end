package tpigrupo2.bacend.service;

import org.springframework.stereotype.Service;
import tpigrupo2.bacend.model.Producto;

import java.util.Collection;


public interface IProductoService {
    public Producto crearProducto(Producto producto);
    public Producto buscarProducto(Integer id);
    public Producto editarProducto(Producto producto);
    public boolean eliminarProducto(Integer id);
    Collection<Producto> listarProductos();

    public Producto buscarPorNombre(String nombre);
}
