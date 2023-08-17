import { useState } from "react";
import CrearProducto from "../crearProducto/CrearProducto";
import styles from "./PanelAdministracion.module.css";
import BasicTable from "../table/BasicTable";
import { Button, FormControl, TextField } from "@mui/material";
import ListarCategorias from "../categoria/ListarCategorias";
import CrearCategoria from "../categoria/CrearCategoria";

function PanelAdministracion() {
  const [isProd, setIsProd] = useState([true, false]);
  const [isCat, setIsCat] = useState([false, false]);

  function ShowProd() {
    if (!isProd[0]) {
      setIsProd([true, false]);
      setIsCat([false, false]);
    }
  }

  function ShowProdForm(){
    setIsProd([false,true])
  }

  function ShowCatForm(){
    setIsCat([false,true])
  }

  function ShowCat() {
    if (!isCat[0]) {
      setIsProd([false, false]);
      setIsCat([true, false]);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <span className={styles.item} onClick={ShowProd}>
            Administrar Productos
          </span>
          <span className={styles.item} onClick={ShowCat}>
            Administrar Categorias
          </span>
        </nav>
        <div className={styles.contenedor}>
          {isProd[1] && <CrearProducto />}
          {isProd[0] && <Button onClick={ShowProdForm} variant="outlined">Nuevo Producto</Button>}
          {isProd[0] && <BasicTable />}

          {isCat[1] && <CrearCategoria />}
          {isCat[0] && <Button onClick={ShowCatForm} variant="outlined">Nueva Categoria</Button>}
          {isCat[0] && <ListarCategorias />}
        </div>
      </div>
      <div className={styles.nomovil}>
        <h4>Este panel no está disponible para dispositivos móviles</h4>
      </div>
    </>
  );
}

export default PanelAdministracion;
