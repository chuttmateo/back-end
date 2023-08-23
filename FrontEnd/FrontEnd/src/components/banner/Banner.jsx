import { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function BannerWithInput() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      image: "airbus-a320.jpg",
      title: "HABILITACIÓN AIRBUS A320",
      button: "¡Iniciar Curso!",
      url: "/productos/4"
    },
    {
      image: "avion-pequena.jpg",
      title: "HORAS DE VUELO",
      button: "¡Sumar Horas!",
      url: "/productos/19"
    }];  // Agrega aquí las URL de las imágenes
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        alt="avion"
        src={images[currentImageIndex].image} // Mostrar la imagen actual
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "white",
            padding: "10px",
            border: "none",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "50px",
          }}
        >
          {images[currentImageIndex].title.toUpperCase()}
        </h1>
        {/*<button
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "2px solid rgb(0, 137, 254)",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {images[currentImageIndex].button}
        </button>*/}
        <Link to={images[currentImageIndex].url}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "2px solid rgb(0, 137, 254)",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            textDecoration: "none"
          }}>
          {images[currentImageIndex].button}
        </Link>
      </div>

      {/* Botones para cambiar entre imágenes */}
      <button
        onClick={handlePrevImage}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          padding: "5px 10px",
          background: "transparent",
          color: "rgba(0, 137, 254, 1)",
          cursor: "pointer",
          fontSize: "50px",
          border: "none"
          //border: "2px solid white",
          //borderRadius: "5px",
        }}
      >
        &#8249;
      </button>
      <button
        onClick={handleNextImage}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          padding: "5px 10px",
          background: "transparent",
          color: "rgba(0, 137, 254, 1)",
          cursor: "pointer",
          fontSize: "50px",
          border: "none"
          //borderRadius: "5px",
          //border: "2px solid white",
        }}
      >
        &#8250;
      </button>
    </Box>
  );
}
