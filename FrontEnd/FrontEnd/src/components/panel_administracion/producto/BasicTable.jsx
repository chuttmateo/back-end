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
import {
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

export default function BasicTable() {
  const apiUrlCat = "http://3.144.46.39:8080/categorias";
  const [listCategoriaState, setListCategoriaState] = useState([]);
  const [token, setToken] = useState("")

  useEffect(() => {
    axios.get(apiUrlCat).then((res) => setListCategoriaState(res.data));
    setToken(JSON.parse(localStorage.getItem("userData")).token);
  }, []);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  function handleInputChange(idx, value, itemAnt) {
    const index = listProductState.indexOf(itemAnt);
    const id_cat = listCategoriaState.find((i) => i.nombre == value).id;
    const modcat = { id: idx, categoria: { id: id_cat } };
    axios
      .put(apiUrl + "/modcat", modcat,config)
      .then((res) => {
        if (res.status == 200) {
          let new_list = [...listProductState];
          new_list[index].categoria = value;
          setListProductState(new_list);
        }
      })
      .catch((error) => {
        alert("Error al actualizar la categoria" + error);
      });
  }

  const apiUrl = "http://3.144.46.39:8080/productos";

  const [listProductState, setListProductState] = useState([]);

  useEffect(() => {
    axios.get(apiUrl).then((res) => setListProductState(res.data));
  }, []);

  function eliminar(id) {
    if (
      confirm(
        `Está seguro que desea eliminar el producto ${listProductState.nombre}`
      )
    ) {
      axios.delete(`http://3.144.46.39:8080/productos/${id}`,config);
      setListProductState(listProductState.filter((p) => p.id != id));
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listProductState.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.nombre}</TableCell>
              <TableCell align="left">
                {
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: 100 }}
                    size="small"
                  >
                    <Select
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      key={row.id + "-" + "categoria"}
                      name={row.id + "-" + "categoria"}
                      id={row.id + "-" + "categoria"}
                      value={row.categoria}
                      onChange={(e) =>
                        handleInputChange(row.id, e.target.value, row)
                      }
                    >
                      <MenuItem value="">
                        <em>Sin Categoria</em>
                      </MenuItem>
                      {listCategoriaState.map((cat) => (
                        <MenuItem
                          key={row.id + "-" + cat.id}
                          value={cat.nombre}
                        >
                          {cat.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                }
              </TableCell>
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
