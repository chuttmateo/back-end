
import DatePicker, { DateObject } from "react-multi-date-picker";
import { FaCalendar } from 'react-icons/fa'; // Importa el icono de calendario de la biblioteca de iconos de React

import { useGlobalState } from "../../utils/Context";

const CustomDatePicker = () => {
  const { setValueDate } = useGlobalState();

  const formatDateForState = (dateObject) => {
    if (!dateObject) return "";
    return dateObject.format("YYYY-MM-DD");
  };

  const handleDateChange = (newValue) => {
    const formattedDates = newValue.map((date) => {
      if (date instanceof DateObject) {
        
        return formatDateForState(date);
      }
      return date;
    });
    setValueDate(formattedDates);
  };
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const weekDays = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]
  

//   return (
//     <DatePicker
//     style={{ background: "transparent",
//     border: "1px solid #ccc", // Cambia el color gris medio según tu preferencia
//     borderRadius: "8px",
//     fontSize: "8px",
//     width: "100%",
//     height: "2rem",
//     paddingLeft: "10px", // Agrega un relleno a la izquierda para un aspecto más atractivo
//     }}
//     containerStyle={{
//       width: "100%",
//       padding: "10px",
      
//     }}
//       weekDays={weekDays}
//       months={months}
//       placeholder="Seleccionar por rango..."
//       onChange={handleDateChange}
//       format="DD/MM/YYYY"
//       range
//       numberOfMonths={2}
//       minDate={new Date()}
//     />
//   );
// }
return (
  
<div style={{ position: 'relative', width: '100%' }}>
    <DatePicker
      className="bg-dark" // fondo oscuro para el calendario
      style={{
        background: "transparent",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "11px",
        color: "white", // Ajusta el tamaño de fuente según tu preferencia
        width: "100%",
        height: "2rem",
        paddingLeft: "35px", // Espacio para el icono
      }}
      containerStyle={{
        width: "100%",
        
      }}
      weekDays={weekDays}
      months={months}
      placeholder="Seleccionar fecha " // Deja el espacio del placeholder vacío
      onChange={handleDateChange}
      format="DD/MM/YYYY"
      range
      numberOfMonths={2}
      minDate={new Date()}
    />
    <FaCalendar
      style={{
        position: 'absolute',
        top: '50%',
        left: '15px', // Ajusta la posición del icono según tus preferencias
        transform: 'translateY(-50%)',
        fontSize: '1rem', // Ajusta el tamaño del icono según tus preferencias
      }}
    />
  </div>
);
   }

export default CustomDatePicker;



