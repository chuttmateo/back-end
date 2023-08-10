import axios from "axios";

import { useEffect, useState } from "react";
import Product_Card_List from "../product/Product_Card_List";
const apiUrl = "http://3.144.46.39:8080/productos";
import styles from "./ListaProductos.module.css"



function ListaProductos() {
  const [listProductState, setListProductState] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListProductState(res.data));
  }, []);

  function eliminar(id) {
        axios.delete(`http://3.144.46.39:8080/productos/${id}`);
        setListProductState(listProductState.filter(p => p.id != id))
  }

  return (
    <>
      <section className="Section-Product-Card-List">
        {listProductState?.map((item) => (
          <Product_Card_List key={item.id} item={item} onEliminar={eliminar} />
        ))}
      </section>
    </>
  );
}

export default ListaProductos;
