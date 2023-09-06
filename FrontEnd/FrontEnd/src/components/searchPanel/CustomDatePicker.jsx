
import DatePicker, { DateObject } from "react-multi-date-picker";
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
  

  return (
    <DatePicker
    style={{
      backgroundColor: "aliceblue",
      height: "2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      width: "100%"
    }}
    containerStyle={{
      width: "100%",
      padding: "10px"
    }}
      weekDays={weekDays}
      months={months}
      placeholder="Seleccionar por rango..."
      onChange={handleDateChange}
      format="DD/MM/YYYY"
      range
      numberOfMonths={2}
      minDate={new Date()}
    />
  );
}

export default CustomDatePicker;