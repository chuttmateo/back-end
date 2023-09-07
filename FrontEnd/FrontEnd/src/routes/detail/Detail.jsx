import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./detail.module.css";
import BotonGaleria from "./BotonGaleria";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./bg-dark.css";
import dayjs from "dayjs";
import { FormControl, InputLabel, Select } from "@mui/material";

const Detail = () => {
  const params = useParams();
  const [values, setValues] = useState(new Date());
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [producto, setProducto] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursosf, setCursosf] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [horas, setHoras] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);

  const horasDisp = ["09:00", "10:00", "11:00", "12:00"];

  const reserved = [
    [
      new DateObject("2023-09-18").format(),
      new DateObject("2023-09-21").format(),
    ],
    [
      new DateObject("2023-10-08").format(),
      new DateObject("2023-10-14").format(),
    ],
  ];

  const initialValue = [...reserved];
  function isReserved(strDate) {
    return reserved.some(([start, end]) => strDate >= start && strDate <= end);
  }

  const [valores, setValores] = useState(initialValue);
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

  const [mesSeleccionado, setMes] = useState(
    months[new Date().getMonth()].toUpperCase()
  );

  const calcularPresupuesto = () => {
    let precio = 0;
    detalles.forEach((detalle) => {
      precio += detalle.precio * detalle.cantidad;
    });
    setPresupuesto(precio);
  };
  useEffect(() => {
    const c = cursos.filter((curso) => dayjs(curso.fechaInicio) >= values);
    if (categoria === "Licencias") {
      setMes(months[new Date(values).getMonth()].toUpperCase());

      setCursosf(c);
    }
  }, [values]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))?.token;
    setToken(data ? data : "");
    axios.get("http://3.144.46.39:8080/productos/" + params.id).then((res) => {
      setProducto(res.data);
      setImagenes(res.data.imagenes);
      setDescripcion(res.data.descripcion);
      setDetalles(res.data.detalles);
      setPoliticas(res.data.politicas);
      setCursos(res.data.cursos);
      setCategoria(res.data.categoria.nombre);
      setValues(new Date());
    });
  }, []);

  useEffect(() => {
    calcularPresupuesto();
  }, [detalles]);

  function selectHora(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value);
    setHoras(value);
  }
  /*calendarPosition={"mainPosition: bottom"}*/
  function calendario() {
    switch (categoria) {
      case "Licencias":
        return (
          <>
            <h5> Buscar por mes de inicio:</h5>
            <Calendar
              months={months}
              month="hide"
              ma
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
            <div className={styles.calendarioHoras}>
              <Calendar
                weekDays={weekDays}
                months={months}
                className="bg-dark"
                value={values}
                onChange={setValues}
                minDate={new DateObject().add(1, "day")}
              />
              <FormControl>
                <InputLabel shrink htmlFor="selecthoras">
                  Hora
                </InputLabel>
                <Select
                  sx={{ width: 90, backgroundColor: "#212529" }}
                  multiple
                  native
                  value={horas}
                  onChange={selectHora}
                  label="Horas disponibles"
                  inputProps={{
                    id: "selecthoras",
                  }}
                >
                  {horasDisp.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          </>
        );
      case "Hospedajes":
        return (
          <>
            <h5> Selecciona las fechas de inicio y fin del hospedaje:</h5>
            <Calendar
              numberOfMonths={2}
              weekDays={weekDays}
              months={months}
              className="bg-dark"
              value={valores}
              multiple
              range
              minDate={new Date()}
              maxDate={new Date(cursos[0].fechaFin)}
              onChange={(ranges) => {
                const isClickedOutsideUnAvailbleDates = initialValue.every(
                  ([start, end]) =>
                    ranges.some(
                      (range) =>
                        range[0]?.format?.() === start &&
                        range[1]?.format?.() === end
                    )
                );

                if (!isClickedOutsideUnAvailbleDates) return false;
                console.log(ranges.map((x) => x.map((y) => y?.format?.())));
                setValores(ranges);
              }}
              mapDays={({ date }) => {
                let className;
                const strDate = date.format();

                if (isReserved(strDate)) className = "reserved";
                if (className) return { className };
              }}
            />
          </>
        );
      default:
        break;
    }
  }

  function montos() {
    let titulo = "PRECIO:"
    let precio = "Debes estar logueado para ver el precio."
    let mostrarBoton = false;
    let noLogin = "Debes estar logueado para reservar.";
    if (token) {
      precio = "$ " + presupuesto;
      
      switch (categoria) {
        case "Licencias":
          mostrarBoton =true
          break;
        case "Horas Libres":
          mostrarBoton=true
          titulo = "PRECIO POR HORA:"
          break;
        case "Hospedajes":
          titulo = "PRECIO POR DÍA:"
          noLogin = "Debes reservar Licencias/horas para poder reservar hospedaje"
          break;
        default:
          break;
      }
    } 

    return (
      <>
        <p>{titulo}</p>
        <p>{precio}</p>
        {mostrarBoton ? (
          <button className="button-primary">Reservar</button>
        ) : (
          noLogin
        )}
      </>
    );
  }

  function calcularDuracion(fechaInicio, fechaFin) {
    const inicio = dayjs(fechaInicio);
    const fin = dayjs(fechaFin);

    return fin.diff(inicio, "M") == 0
      ? fin.diff(inicio, "d") + " DÍAS"
      : fin.diff(inicio, "M") + " MESES";
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
          <div className={styles.montos}>{montos()}</div>
          <div className={styles.calendario}>
            {
              // Seccion calendario
              calendario()
            }
          </div>
        </div>

        <div className={styles.inicioCursos}>
          {categoria == "Licencias" && (
            <h4>PROXIMOS INICIOS DESDE {mesSeleccionado}:</h4>
          )}
          {categoria == "Licencias" &&
            cursosf?.map((curso) => (
              <div key={curso.id} className={styles.contenedorResultados}>
                <div className={styles.resultados}>
                  <span>FECHA DE INICIO</span>
                  <span>{dayjs(curso.fechaInicio).format("DD/MM/YYYY")}</span>
                </div>
                <div className={styles.resultados}>
                  <span>DURACION</span>
                  <span>
                    {calcularDuracion(curso.fechaInicio, curso.fechaFin)}
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
