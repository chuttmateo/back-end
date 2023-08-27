import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./detail.module.css";
//import { Box, Grid, Card, CardMedia } from "@mui/material";
import BotonGaleria from "./BotonGaleria";

const Detail = () => {
  const params = useParams();

  const navigate = useNavigate();
  const [token, setToken] = useState("")
  const [licencia, setLicencia] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  //const [detallesSinDescripcion, setDetallesSinDescripcion] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);

  // const [category, setCategory] = useState("");

  /*   const eliminarDescripcion = () => {
    setDetallesSinDescripcion(detalles.splice(0, 1));
  }; */

  const calcularPresupuesto = () => {
    let precio = 0;
    detalles.forEach((detalle) => {
      precio += detalle.precio * detalle.cantidad;
    });
    setPresupuesto(precio);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))?.token
    setToken(data?data:"");
    axios.get("http://3.144.46.39:8080/productos/" + params.id).then((res) => {
      setLicencia(res.data.nombre);
      setImagenes(res.data.imagenes);
      setDescripcion(res.data.descripcion);
      //setDescripcion(res.data.detalles[0].descripcion);
      setDetalles(res.data.detalles);

    });
  }, []);

  /*   useEffect(() => {
    eliminarDescripcion();
  }, [descripcion]); */

  useEffect(() => {
    calcularPresupuesto();
  }, [detalles]);

  //useEffect(() => {}, [detallesSinDescripcion]);

  return (
    <>
      <div className={styles.barra}>
        {imagenes.slice(1, 5).map((im) => (
          <div key={im?.ruta} className={styles.cont_min}>
            <img src={im?.ruta} alt="" className={styles.imagen_min} />
          </div>
        ))}
        <BotonGaleria images={imagenes} />
      </div>
      <div className={styles.detail_contenedor}>
        <div className={styles.imagen}>
          <img src={imagenes[0]?.ruta} alt="" className={styles.imagen2} />
        </div>

        <div className={styles.botonGaleria}>
          
            <span className={styles.titulo}>{licencia.toString().toUpperCase()}</span>
          
        </div>
        <div className={styles.caracteristicasdescripcion}>
          <div className={styles.caracteristicas}>
            <div className={styles.detalles}>
              <h5 className={styles.textcaract}>CARACTERISTICAS </h5>
              {detalles[0]?.precio != 0 &&
                detalles?.map((detalle, index) => (
                  <div key={detalle.id} className={styles.iconos}>
                    <img
                      src={detalle.image}
                      alt=""
                      className={styles.iconos2}
                    />
                    {/* Si el detalle.cantidad es 1 quiere decir que no tiene una caractristica númerica como puede ser el caso de las */}
                    {detalle.cantidad != 1 ? (
                      <p>
                        &nbsp;&nbsp; {detalle.cantidad} {detalle.descripcion} 
                      </p>
                    ) : (
                      <p>&nbsp;&nbsp;{detalle.descripcion}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.descripcion}>
            <button
              onClick={() => navigate("/home")}
              className={styles.botonatras}
            >
              ↩
            </button>
            <img
              src="/imagen-descripcion.png"
              className={styles.imagendescripcion}
            />
            <p className={styles.p}>{descripcion}</p>
          </div>
        </div>
        <div className={styles.presupuesto}>
          {presupuesto ? (
            <div>
              {" "}
              <h5 className={styles.presupuesto}>
                <p className={styles.montos}>MONTO TOTAL: </p>
                <span>{token? "$ "+ presupuesto: "Debes estar logueado para ver el precio."}</span>{" "}
              </h5>
            </div>
          ) : (
            <p>Cargando presupuesto</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
