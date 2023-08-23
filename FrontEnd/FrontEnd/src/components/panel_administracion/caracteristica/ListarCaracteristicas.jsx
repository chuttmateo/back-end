//import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
//import { ThemeProvider, createTheme, useTheme } from "@mui/material";

export default function ListarCaracteristicas() {
  const apiUrl = "http://3.144.46.39:8080/caracteristicas";

  const [listCaracteristicaState, setListCaracteristicaState] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListCaracteristicaState(res.data));
  }, []);

  function eliminar(id) {
    if (
      confirm(
        `Está seguro que desea eliminar la caracteristica ${listCaracteristicaState.nombre}`
      )
    ) {
      axios.delete(`http://3.144.46.39:8080/caracteristicas/${id}`);
      setListCaracteristicaState(listCaracteristicaState.filter((p) => p.id != id));
    }
  }
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Descripcion</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCaracteristicaState.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="left">{row.descripcion}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: "3px" }}>
                <button
                  className="eliminate-btn"
                  onClick={() => {
                    eliminar(row.id);
                  }}
                >
                  Eliminar
                </button>
                <button className="edit-btn">Editar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
