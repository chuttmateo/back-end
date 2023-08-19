import Box from "@mui/material/Box";

export default function BannerWithInput(props) {
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
        src={props.img}
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
          HABILITACIÓN AIRBUS A320
        </h1>
        <button
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "2px solid white",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ¡Iniciar Curso!
        </button>
      </div>
    </Box>
  );
}
