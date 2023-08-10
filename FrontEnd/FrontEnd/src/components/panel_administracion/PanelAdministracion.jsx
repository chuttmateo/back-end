import { useState } from "react"
import CrearProducto from "../crearProducto/CrearProducto"
import ListaProductos from "../listarProductos/ListaProductos"
import styles from './PanelAdministracion.module.css'

function PanelAdministracion(){
    const [isForm, setIsForm] = useState(false)
    const [isList, setIsList] = useState(false)


    function ShowForm(){
        if(!isForm){
            setIsForm(true)
            setIsList(false)
        }else{
            setIsForm(false)
        }
    }

    function ShowList(){
        if(!isList){
            setIsForm(false)
            setIsList(true)
        }else{
            setIsList(false)
        }
    }
    return (
    <>
    <div className={styles.container}>
        <nav className={styles.menu}>
        <span className={styles.item} onClick={ShowForm}>Agregar Producto</span>
        <span className={styles.item} onClick={ShowList}>Listar Productos</span>
        </nav>
        <div>
            {isForm&& <CrearProducto />}
            {isList&& <ListaProductos />}
        </div>
    </div>
    <div className={styles.nomovil}>
        <h4>Este panel no está disponible para dispositivos móviles</h4>
    </div>

    </>
    )
}

export default PanelAdministracion