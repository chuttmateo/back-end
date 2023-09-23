import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./reserva.module.css";
import { Calendar, DateObject } from "react-multi-date-picker";
import "../detail/bg-dark.css";
import dayjs from "dayjs";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import swal from "sweetalert";


const getTargetElement = () => document.getElementById('root');
// pdf

const pdfOptions = {
  // default is `save`
  method: 'save',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.NORMAL,
  page: {
     // margin is in MM, default is Margin.NONE = 0
     margin: Margin.NONE,
     // default is 'A4'
     format: 'LETTER',
     // default is 'portrait'
     orientation: 'landscape',
  },
  canvas: {
     // default is 'image/jpeg' for better size performance
     mimeType: 'image/jpeg',
     qualityRatio: 1
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break, 
  // so use with caution.
  overrides: {
     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
     pdf: {
        compress: true
     },
     // see https://html2canvas.hertzen.com/configuration for more options
     canvas: {
        useCORS: false
     }
  },
};



//////pdf

export default function Reserva() {
  const [values, setValues] = useState(new Date());
  const [token, setToken] = useState("");
  const [producto, setProducto] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursosf, setCursosf] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [horas, setHoras] = useState([]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [reserva, setReserva] = useState([]);
  const navigate = useNavigate();

  // para el formulario
  const [nombre, setNombre] = useState(" ");
  const [apellido, setApellido] = useState(" ");
  const [pais, setPais] = useState(" ");
  const [localidad, setLocalidad] = useState(" ");
  const [dni, setDni] = useState(" ");
  const [telefono, setTelefono] = useState(" ");

  const [paisError, setPaisError] = useState("");
  const [localidadError, setLocalidadError] = useState("");
  const [dniError, setDniError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  
  const horasDisp = ["09:00", "10:00", "11:00", "12:00"];

  function isReserved(strDate) {
    return reservas.some(([start, end]) => strDate >= start && strDate <= end);
  }

  function validateText(texto) {
    const regex = /^[\w+\s]+$/;
    return regex.test(texto) && texto.trim().length >= 3;
  }

  function validateNumber(numero, minimo) {
    const regex = /^[\d+-\s\.]+$/;
    return regex.test(numero) && numero.trim().length >= minimo;
  }

  const [valores, setValores] = useState([]);
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

  function calcularTotal() {
    let cant = 1;
    if (categoria == "Horas Libres") {
      cant = horas.length;
      setCantidad(cant);
    }
  }

  function dias(dias) {
    if (dias.length > 1) {
      dias = [dias.pop()];
    }
    let cant = 1;
    if (dias.length == 1) {
      cant = dayjs(dias[0][1])?.diff(dayjs(dias[0][0]), "d");
      cant = cant > 1 ? cant : 1;
    }
    setCantidad(cant);
    setValores(dias);
  }

  useEffect(() => {
    const c = cursos.filter((curso) => dayjs(curso.fechaInicio) >= values);
    if (categoria === "Licencias") {
      setMes(months[new Date(values).getMonth()].toUpperCase());

      setCursosf(c);
    }
  }, [values]);

  function obtenerFechas(res) {
    if (res.length > 0) {
      let resFechas = [];
      res.forEach((r) => {
        resFechas = r.map((f) => [
          new DateObject(f.fecha_inicio).format(),
          new DateObject(f.fecha_fin).format(),
        ]);
      });
      setReservas(resFechas);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const productData = JSON.parse(localStorage.getItem("productData"));
    setReserva(productData);
    setToken(data ? data : "");
    setPresupuesto(productData.precio);

    const config = {
      headers: {
        authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("http://3.144.46.39:8080/productos/" + productData.producto)
      .then((res) => {
        setProducto(res.data);
        setImagenes(res.data.imagenes);
        setDescripcion(res.data.descripcion);
        setDetalles(res.data.detalles);
        //setPoliticas(res.data.politicas);
        setCursos(res.data.cursos);
        const cat = res.data.categoria.nombre;
        setCategoria(cat);
        obtenerFechas(
          res.data.cursos?.map((c) => c.reservas).filter((r) => r.length > 0)
        );
        if (cat == "Horas Libres") {
          setValues(new DateObject(productData.fecha_inicio));
          setHoras(productData.hora_inicio);
        }
        if (cat == "Licencias") {
          setValues(new DateObject(productData.fecha_inicio));
        }
        setCantidad(1);
        if (cat == "Hospedajes") {
          dias([
            [
              new DateObject(productData.fecha_inicio),
              new DateObject(productData.fecha_fin),
            ],
          ]);
        }

        axios
          .get("http://3.144.46.39:8080/usuario/" + data.username, config)
          .then((res) => {
            setNombre(res.data.firstname || "");
            setApellido(res.data.lastname || "");
            setPais(res.data.pais || "");
            setLocalidad(res.data.localidad || "");
            setDni(res.data.dni || "");
            setTelefono(res.data.telefono || "");
          });
      });
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [cantidad, horas]);

  async function reservar() {
    let data = reserva;

    if (!validateText(pais)) {
      setPaisError("El Pais debe contener al menos 3 carácteres (letras) ");
      return;
    }
    setPaisError("");

    if (!validateText(localidad)) {
      setLocalidadError(
        "La localidad debe contener al menos 3 carácteres (letras) "
      );
      return;
    }
    setLocalidadError("");

    if (!validateNumber(dni, 8)) {
      setDniError("El DNI o Pasaporte debe contener al menos 8 dígitos");
      return;
    }
    setDniError("");
    if (!validateNumber(telefono, 13)) {
      setTelefonoError(
        "El teléfono debe contener al menos 13 dígitos (incluir el código de país)"
      );
      return;
    }
    setTelefonoError("");

    const config = {
      headers: {
        authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
    };
    if (categoria === "Hospedajes") {
      if (valores.length == 0) {
        alert("debes seleccionar las fechas de ChekIn checkOut");
        return;
      }
      console.log(valores);
      valores?.map((x) => {
        data.fecha_inicio = x[0].format("YYYY-MM-DD");
        data.fecha_fin = x[1].format("YYYY-MM-DD");
        data.precio = presupuesto * cantidad; //precioTotal;
      });
    }
    if (categoria === "Horas Libres") {
      if (values.length == 0 || horas.length == 0) {
        alert("Debes seleccionar las fecha y hora para reservar");
        return;
      }
      data.fecha_inicio = values.format("YYYY-MM-DD");
      data.fecha_fin = values.format("YYYY-MM-DD");
      data.hora_inicio = horas[0];
      data.precio = presupuesto * cantidad; //precioTotal;
      data.cantidad = horas.length;
    }

    if (categoria === "Licencias") {
      const cursoSeleccionado = cursosf.filter(
        (curso) => curso.fechaInicio == values.format("YYYY-MM-DD")
      );

      if (cursoSeleccionado.length == 0) {
        alert("Debes seleccionar un curso");
        return;
      }

      data.id_curso = cursoSeleccionado[0].id;
      data.fecha_inicio = cursoSeleccionado[0].fechaInicio;
      data.fecha_fin = cursoSeleccionado[0].fechaFin;
      data.precio = presupuesto * cantidad; //precioTotal;
    }

    if (categoria == "Merchandising" || categoria == "Uniformes") {
      data.cantidad = cantidad;
      data.precio = presupuesto * cantidad; //precioTotal;
    }
    let msj = "";
    /* //const pdf = await generatePDF(getTargetElement, pdfOptions);

    const imageToBase64 = (image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    };
    //imageToBase64(new Blob([pdf, {type:'application/pdf'}]))
    //data.archivo = pdf*/
    const userData = {
      username: token.username,
      firstname: nombre,
      telefono: telefono,
      dni: dni,
      localidad: localidad,
      lastname: apellido,
      pais: pais,
    };
    //console.log(data)
    axios.put("http://3.144.46.39:8080/usuario", userData, config);

    axios
      .post("http://3.144.46.39:8080/reservas", data, config)
      .then((res) => {
        msj = res.data;


        swal({
          icon: "success",
          title:"Reserva generada correctamente, nos pondremos en contacto a la brevedad.",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
        
        //generatePDF(getTargetElement, pdfOptions)
        navigate("/profile/" + token.id);
      })
      .catch(() => {
        swal({
          icon: "error",
          title:"Error al generar la reserva",
          text: "Se produjo un error en el proceso de reserva, por favor intente nuevamente más tarde!",
          closeOnClickOutside: false,
          closeOnEsc: false,
          button: "Aceptar",
        })
      });
  }

  function selectHora(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setHoras(value);
  }

  function calendario() {
    switch (categoria) {
      case "Licencias":
        return (
          <>
            <h6 style={{ marginTop: "20px" }}> CONFIRMAR FECHA DE INICIO:</h6>
            <div style={{ position: "relative", width: "100%" }}>
              <Calendar
                placeholder="CONFIRMAR FECHA DE INICIO:"
                months={months}
                month="hide"
                className="bg-dark"
                onlyMonthPicker
                value={values}
                onChange={setValues}
                minDate={new Date()}
              />
            </div>
          </>
        );

      case "Horas Libres":
        return (
          <>
            <h6 style={{ marginTop: "40px" }}>
              {" "}
              SELECCIONA EL DIA Y LA HORA DE COMIENZO DE LA PRACTICA:
            </h6>
            <div className={styles.diayhora}>
              <div className={styles.calendarioHoras}>
                <div style={{ position: "relative" }}>
                  <Calendar
                    weekDays={weekDays}
                    months={months}
                    className="bg-dark"
                    value={values}
                    onChange={setValues}
                    mapDays={({ date }) => {
                      const strDate = date.format();
                      if (isReserved(strDate))
                        return {
                          disabled: true,
                        };
                    }}
                    minDate={new DateObject().add(1, "day")}
                  />
                </div>
              </div>
              <FormControl>
                <InputLabel
                  shrink
                  htmlFor="selecthoras"
                  sx={{ marginTop: "20px" }}
                >
                  Hora
                </InputLabel>
                <Select
                  sx={{
                    width: 90,
                    backgroundColor: "#212529",
                    marginTop: "20px",
                  }}
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
            <h6 style={{ marginTop: "30px" }}>
              {" "}
              SELECCIONA LAS FECHAS DEL HOSPEDAJE:
            </h6>
            <div style={{ position: "relative", width: "100%" }}>
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
                onChange={(e) => dias(e)}
                mapDays={({ date }) => {
                  const strDate = date.format();
                  if (isReserved(strDate))
                    return {
                      disabled: true,
                    };
                }}
              >
                <button className="button-primary" onClick={() => dias([])}>
                  Clear
                </button>
              </Calendar>
            </div>
          </>
        );
      default:
        return (
          <div>
            <img className={styles.imagen} src={imagenes[4]?.ruta} alt="" />
          </div>
        );
    }
  }

  function montos() {
    let titulo = "PRECIO:";
    let precio = "Debes estar logueado para ver el precio y reservar.";
    let mostrarCantidad = false;

    if (token) {
      precio = "$ " + presupuesto;

      switch (categoria) {
        case "Licencias":
          titulo = "";
          precio="";
          break;
        case "Horas Libres":
          titulo = "";
          precio = "";
          break;
        case "Hospedajes":
          titulo = "";
          precio="";
          break;
        default:
          titulo = "PRECIO:";
          mostrarCantidad = true;
          break;
      }
    }

    return (
      <>
        <p>{titulo}</p>
        <p>{precio}</p>
        {mostrarCantidad && (
          <TextField
            label="Cantidad"
            sx={{ width: "120px" }}
            required
            type="number"
            placeholder="Cantidad"
            name={"cantidad"}
            value={cantidad}
            onChange={(e) =>
              setCantidad(e.target.value >= 1 ? e.target.value : 1)
            }
          />
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

  function inicioCursos() {
    if (categoria == "Licencias") {
      return (
        <div className={styles.inicioCursos}>
          {categoria == "Licencias" &&
            (cursosf.length > 0 ? (
              <h4>SELECCIONA EL CURSO:</h4>
            ) : (
              <h4>NO HAY INICIOS A PARTIR DE LA FECHA SELECCIONADA</h4>
            ))}
          {categoria == "Licencias" &&
            cursosf?.map((curso) => (
              <div
                key={curso.id}
                className={
                  dayjs(curso.fechaInicio).format("DD/MM/YYYY") ==
                  values.format("DD/MM/YYYY")
                    ? styles.resultadoSeleccionado
                    : styles.contenedorResultados
                }
              >
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
                  {
                    <button
                      onClick={() =>
                        setValues(new DateObject(curso.fechaInicio))
                      }
                      className="button-primary"
                    >
                      Seleccionar
                    </button>
                  }
                </div>
              </div>
            ))}
        </div>
      );
    }
  }

  return (
    <div className={styles.raiz}>
      <div className={styles.cuerpo}>
        <div className={styles.encabezado}>
          <div className={styles.textos}>
            <span className={styles.titulo}>
              {producto?.nombre?.toString().toUpperCase()}
            </span>
            <p className={styles.pp}>{descripcion}</p>
            <div className={styles.presupuesto}>
              <div className={styles.calendario}>{calendario()}</div>
              <div className={styles.montos}>{montos()}</div>
            </div>
          </div>

          <div className={styles.galeria}>
            <div>
              <img className={styles.imagen} src={imagenes[0]?.ruta} alt="" />
            </div>

            <div className={styles.barra}>
              {imagenes.slice(1, 4).map((im) => (
                <div key={im?.ruta} className={styles.cont_min}>
                  <img
                    src={im?.ruta + "_tn.jpg"}
                    alt=""
                    className={styles.imagen_min}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.caracteristicas}>
          <div className={styles.detalles}>
            {detalles?.map((detalle) => (
              <div key={detalle.id} className={styles.iconos}>
                <img src={detalle.image} alt="" className={styles.iconos2} />
                {detalle.cantidad != 1 ? (
                  <p className={styles.pCaracteristicas}>
                    &nbsp;&nbsp; {detalle.cantidad} {detalle.descripcion}
                  </p>
                ) : (
                  <p>&nbsp;&nbsp;{detalle.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {inicioCursos()}
        <div className={styles.info}>
          <h2>INFORMACION DE CONTACTO Y FACTURACION:</h2>
          <div className={styles.formulario}>
            <TextField
              className={styles.inputs}
              disabled
              id="username"
              label="Email"
              name="user_email"
              value={token.username}
            />
            <TextField
              className={styles.inputs}
              disabled
              id="nombre"
              label="Nombre"
              value={nombre}
            />
            <TextField
              className={styles.inputs}
              disabled
              id="apellido"
              label="Apellido"
              value={apellido}
            />
            <TextField
              className={styles.inputs}
              id="pais"
              label="Pais"
              value={pais}
              error={paisError !== ""}
              helperText={paisError}
              onChange={(e) => {
                setPaisError("");
                setPais(e.target.value);
              }}
            />
            <TextField
              className={styles.inputs}
              id="localidad"
              label="Localidad"
              value={localidad}
              error={localidadError !== ""}
              helperText={localidadError}
              onChange={(e) => {
                setLocalidadError("");
                setLocalidad(e.target.value);
              }}
            />

            <TextField
              className={styles.inputs}
              id="dni"
              label="DNI o Pasaporte"
              value={dni}
              error={dniError !== ""}
              helperText={dniError}
              onChange={(e) => {
                setDniError("");
                setDni(e.target.value);
              }}
            />
            <TextField
              className={styles.inputs}
              id="telefono"
              label="Telefono"
              value={telefono}
              error={telefonoError !== ""}
              helperText={telefonoError}
              onChange={(e) => {
                setTelefonoError("");
                setTelefono(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.botonTotal}>
          <div className={styles.montoTotal}>
            <h3>PRECIO TOTAL: {presupuesto * cantidad}</h3>
            <button className="button-primary" onClick={reservar}>
              {categoria == "Licencias" ||
              categoria == "Hospedajes" ||
              categoria == "Horas Libres"
                ? "Reservar"
                : "Comprar"}
            </button>
            {/*<button onClick={()=>generatePDF(getTargetElement, pdfOptions)}>Download PDF</button>*/}
          </div>
          
        </div>
      </div>
    </div>
  );
}
