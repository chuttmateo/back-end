import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import styles from "./ImgMediaCard.module.css";

export default function ImgMediaCard({ item }) {
  return (
    <Card
      sx={{
        // maxWidth: 345,
        maxWidth:700,
        backgroundColor: "#1e1e1e",
        color: "white",
        border: "4px solid rgb(0, 137, 254)",
        borderRadius: "0px",
      }}
    >
      <CardMedia sx={{ height: 190 }} image={item.imagen} title={item.nombre} />
      <CardContent>
        <Typography variant="h5" component="div">
          {item.nombre}
        </Typography>
        <Typography>{item.descripcion}</Typography>
      </CardContent>
      <CardActions>
        <Link className={styles.button} to={"/products/detail/" + item.id}>
          Ver detalles
        </Link>
      </CardActions>
    </Card>
  );
}
