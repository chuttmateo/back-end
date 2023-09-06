import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./detail.module.css";
import BotonGaleria from "./BotonGaleria";
import DatePicker, { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import size from "react-element-popper/animations/size"
import "./bg-dark.css";
import dayjs from "dayjs";

const Detail = () => {
  const params = useParams();
  const [values, setValues] = useState(new Date());
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [producto, setProducto] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [cursosf, setCursosf] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];

  const calcularPresupuesto = () => {
    let precio = 0;
    detalles.forEach((detalle) => {
      precio += detalle.precio * detalle.cantidad;
    });
    setPresupuesto(precio);
  };
  useEffect(() => {
    const c = cursos.filter((curso) => dayjs(curso.fechaInicio) >= values);
    setCursosf(c);
  }, [values]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))?.token;
    setToken(data ? data : "");
    axios.get("http://3.144.46.39:8080/productos/" + params.id).then((res) => {
      setProducto(res.data);
      setImagenes(res.data.imagenes);
      setDescripcion(res.data.descripcion);
      //setDescripcion(res.data.detalles[0].descripcion);
      setDetalles(res.data.detalles);
      setPoliticas(res.data.politicas);
      setCursos(res.data.cursos);
      console.log(producto);
    });
  }, []);

  useEffect(() => {
    calcularPresupuesto();
  }, [detalles]);
  /*calendarPosition={"mainPosition: bottom"}*/
  function calendario() {
    switch (producto?.categoria?.nombre) {
      case "Licencias":
        return (
          <>
            <h5> Buscar por mes de inicio:</h5>
            <Calendar
              months={months}
              className="bg-dark"
              onlyMonthPicker
              value={values}
              onChange={setValues}
              minDate={new Date()}
            />
          </>
        );
      case "Horas Libres":
        return (
          <>
            <h5> Selecciona el día y la hora de comienzo de la práctica:</h5>
            <DatePicker
              weekDays={weekDays}
              months={months}
              onChange={setValues}
              className="bg-dark"
              format="MM/DD/YYYY HH"
              plugins={[
                <TimePicker key="hour" position="bottom" hideSeconds />,
              ]}
            />
          </>
        );
      case "Hospedajes":
        return (
          <>
            <h5> Selecciona las fechas de inicio y fin del hospedaje:</h5>
            <DatePicker
              weekDays={weekDays}
              months={months}
              className="bg-dark"
              value={values}
              onChange={setValues}
              range
              minDate={new Date()}
            />
          </>
        );
      default:
        break;
    }
  }

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
          <span className={styles.titulo}>
            {producto?.nombre?.toString().toUpperCase()}
          </span>
        </div>
        <div className={styles.caracteristicasdescripcion}>
          <div className={styles.caracteristicas}>
            <div className={styles.detalles}>
              <h5 className={styles.textcaract}>CARACTERISTICAS </h5>
              {detalles?.map((detalle) => (
                <div key={detalle.id} className={styles.iconos}>
                  <img src={detalle.image} alt="" className={styles.iconos2} />
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
          <div className={styles.montos}>
            <p>MONTO TOTAL: </p>
            <p>
              {token
                ? "$ " + presupuesto
                : "Debes estar logueado para ver el precio."}
            </p>
          </div>
          <div className={styles.calendario}>
            {
              // Seccion calendario
              calendario()
            }
          </div>
        </div>
        <div>
          {cursosf?.map((curso) => (
            <div key={curso.id} className={styles.contenedorResultados}>
              <div className={styles.resultados}>
                <span>FECHA DE INICIO</span>
                <span>{dayjs(curso.fechaInicio).format("DD/MM/YYYY")}</span>
              </div>
              <div className={styles.resultados}>
                <span>DURACION</span>
                <span>
                  {new Date(curso.fechaFin).getMonth() -
                    new Date(curso.fechaInicio).getMonth() -
                    12 *
                      (new Date(curso.fechaInicio).getFullYear() -
                        new Date(curso.fechaFin).getFullYear()) +
                    " MESES"}
                </span>
              </div>
              <div className={styles.resultados}>
                <span>MODALIDAD</span>
                <span>{curso.modalidad}</span>
              </div>
              <div className={styles.resultados}>
                <button className="button-primary">Inscribirme</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contenedorPoliticas}>
          {politicas?.map((politica) => (
            <div key={politica.id} className={styles.politica}>
              <h5>{politica.titulo}</h5>
              <span>{politica.descripcion}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;
