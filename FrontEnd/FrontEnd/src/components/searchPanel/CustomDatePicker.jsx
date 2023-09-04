import { useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useGlobalState } from "../../utils/Context";

const CustomDatePicker = () => {
  const { valueDate, setValueDate } = useGlobalState();

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

  useEffect(() => {
    console.log(valueDate);
  },[valueDate])
  

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
      placeholder="Seleccionar por rango..."
      value={valueDate}
      onChange={handleDateChange}
      format="YYYY/MM/DD"
      range
      numberOfMonths={2}
      minDate={new Date()}
    />
  );
}

export default CustomDatePicker;