import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ImgMediaCard({ item }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 500,
        backgroundColor: "#1e1e1e",
        color: "white",
        border: "1px solid rgb(0, 137, 254)",
        borderRadius: "0px",
      }}
    >
      <CardMedia sx={{ height: 250 }} image={item.imagen} title={item.nombre} />
      <CardContent>
        <Typography variant="h5" component="div">
          {item.nombre}
        </Typography>
        <Typography>{item.descripcion}</Typography>
      </CardContent>
      <CardActions sx={{ margin: "5px" }}>
        <Link className="button-primary" to={"/productos/" + item.id}>
          Ver detalles
        </Link>
      </CardActions>
    </Card>
  );
}
