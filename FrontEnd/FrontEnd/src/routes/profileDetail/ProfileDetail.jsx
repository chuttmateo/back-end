
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
import { redirect } from "react-router";
import { Link } from "react-router-dom";
import { Alert, Box, Button, Collapse, FormControl, TextField } from "@mui/material";
import styles from "./ProfileDetail.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";
import swal from "sweetalert";
import dayjs from "dayjs";
//import { ThemeProvider, createTheme, useTheme } from "@mui/material";

const ProfileDetail = () => {
  const [listFavoritos, setListFavoritos] = useState([]);
  const [userData, setUserData] = useState([]);
  const [newProfileData, setNewProfileData] = useState({username: '', lastname: '', firstname: '', localidad: '', telefono:'', dni: '', pais: ''})
  const [productosFavoritos, setProductosFavoritos] = useState([])
  const [idFavoritos, setIdFavoritos] = useState([])
  const [reservas, setReservas] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const productsUrl = "http://3.144.46.39:8080/productos"
  
  const loadData = async ()=>{

    const data = await JSON.parse(localStorage.getItem("userData"));

    if (data) {

      const header = {
        headers: {
          authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        }
      }
      console.log('header', header);
      /* setUserData(data); */

      //DATOS PARA FORMULARIO
      axios.get('http://3.144.46.39:8080/usuario/' + data.username, header)
      .then(res => setNewProfileData({username: data.username, lastname: data.lastname, firstname: data.firstname, localidad: res.data.localidad, telefono: res.data.telefono, dni: res.data.dni, pais: res.data.pais }) )
      .catch(err => console.log(err))

      //TABLA DE RESERVAS
      axios.get('http://3.144.46.39:8080/reservas', header)
      .then(res => setReservas(res.data.filter(reserva => reserva.user.id == data.id )) /* console.log('datos de reserva', res.data) */)
      

      //DATOS PARA FAVORITOS

      const apiUrl = `http://3.144.46.39:8080/favoritos/${data.username}`;
      const response = await axios.get(apiUrl);
      const favsData = response.data;
      setUserData(data)
      setListFavoritos(favsData);

      if(favsData){
        /* setProductosFavoritos(console.log(favsData.filter(producto => producto.id === listIdFavoritos.id)) ) */
        const listIdFavoritos = favsData.map(favorito => favorito.producto)
        axios.get(productsUrl).then(res => {
          setProductosFavoritos(res.data.filter(producto => listIdFavoritos.includes(producto.id)))
          setIdFavoritos(listIdFavoritos)
        })
      }

    } else {
      redirect("/home")
    }
   
  }

  
  useEffect(() => {
    loadData() 
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Si tengo que agregar CONFIG al PUT
   const putConfig = {
    headers: {
      authorization: `Bearer ${userData.token}`, 
      "Content-Type": "application/json",
    },
  }; 

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('entro al submit');
    console.log(putConfig);
    

    const object = {
      username: newProfileData.username,
      lastname: newProfileData.lastname,
      telefono: newProfileData.telefono,
      dni: newProfileData.dni /* newProfileData.dni.length > 6 ? newProfileData.dni : null */,
      pais: newProfileData.pais,
      localidad: newProfileData.localidad,
    }

    let loadingTimeout;

  axios
    .put('http://3.144.46.39:8080/usuario', object, putConfig)
    .then((res) => {
      setLoading(true);

      // Inicia el timeout y almacena el ID en la variable loadingTimeout
      loadingTimeout = setTimeout(() => {
        setLoading(false);
        if (res.status === 200) {
          setOpen(true)
          console.log('Nuevos datos de usuario enviados');
          console.log(object);
        }
      }, 2000); // 2000 milisegundos (2 segundos)
    })
    .catch((error) => {
      setError(true)
      console.log(object);
      console.log(error);

    // Cancela el timeout si se produce un error
    clearTimeout(loadingTimeout);
  });
    
  }

 

  const handleFavorito = (id) => {

    const deleteConfig = {
      headers: {
        authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
    }; 

    const favAEliminar = listFavoritos.filter(item => item.producto === id);
     setIdFavoritos(idFavoritos.filter(item => item !== id))
       axios.delete(`http://3.144.46.39:8080/favoritos/${favAEliminar[0].id}`, deleteConfig)
        .then(response => {
          setProductosFavoritos(productosFavoritos.filter(producto => producto.id !== id))

        })
        .catch(error =>{
          console.log(error);
        })      
  }



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);
    setNewProfileData({
      ...newProfileData,
      [name]: value,
    });
  };

  return (
    <>
      <Box sx={{ width: '35%', position: 'fixed', right: '0', top: '50', mt:'6px', zIndex:12, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', '@media (max-width: 768px)': {
      width: '100%', // Cambia el ancho al 100% para pantallas más pequeñas
    }, }}>
        <Collapse in={open}>
          <Alert severity="info" onClose={() => setOpen(false)}>Perfil actualizado correctamente.</Alert>
        </Collapse>

      </Box>
      <Box sx={{ width: '35%', position: 'fixed', right: '0', top: '50', mt:'6px', zIndex:12, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', '@media (max-width: 768px)': {
      width: '100%', // Cambia el ancho al 100% para pantallas más pequeñas
    }, }}>
        <Collapse in={error}>
          <Alert severity="error" onClose={() => setError(false)}>Error al actualizar perfil. Vuelva a iniciar sesión </Alert>
        </Collapse>
      </Box>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1E1E1E",
          marginTop: "70px",
        }}
      >
        <article className={styles.userForm}>
        <h4 className={styles.tituloForm}>ACTUALIZAR PERFIL</h4>
          <Box component="form" onSubmit={handleSubmit} >
            <div className={styles.inputGroup}>
                <FormControl  sx={{ m: 1, width: '48%', '@media (max-width: 530px)': {
                  width: '90%',
                  },}} >
                  <TextField
                      InputLabelProps={{ shrink: true }}
                      id="outlined"
                      label="Nombre"
                      variant="outlined"
                      name="firstname"
                      value={newProfileData.firstname}
                      onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '48%', '@media (max-width: 530px)': {
                  width: '90%',
                  }, }}>
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Apellido"
                    variant="outlined"
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={newProfileData.lastname}
                    onChange={handleInputChange}
                  />
                </FormControl>
            </div>
            <div className={styles.inputGroup}>
            <FormControl  sx={{ m: 1, width: '32%', '@media (max-width: 530px)': {
                  width: '90%',
                  },}} >
                  <TextField
                      InputLabelProps={newProfileData?.telefono != null && newProfileData?.telefono != null ? { shrink: true }: { shrink: false }}
                      id="outlined"
                      label="Telefono"
                      variant="outlined"
                      name="telefono"
                      type="text"
                      value={newProfileData.telefono}
                      onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl  sx={{ m: 1, width: '32%', '@media (max-width: 530px)': {
                  width: '90%',
                  },}} >
                  <TextField
                      InputLabelProps={newProfileData?.dni != null && newProfileData?.dni != null ? { shrink: true }: { shrink: false }}
                      id="outlined"
                      label="DNI"
                      variant="outlined"
                      name="dni"
                      value={newProfileData.dni}
                      onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl  sx={{ m: 1, width: '32%', '@media (max-width: 530px)': {
                  width: '90%',
                  },}} >
                  <TextField
                      InputLabelProps={newProfileData?.pais != null && newProfileData?.pais != null ? { shrink: true }: { shrink: false }}
                      id="outlined"
                      label="Pais"
                      variant="outlined"
                      name="pais"
                      value={newProfileData.pais}
                      onChange={handleInputChange}
                    />
                </FormControl>
            </div>
            <div className={styles.inputGroup}>
              <FormControl  sx={{ m: 1, width: '50%', '@media (max-width: 530px)': {
                  width: '90%',
                  },}}  >
                <TextField
                   InputLabelProps={newProfileData?.localidad != null && newProfileData?.localidad != null ? { shrink: true }: { shrink: false }}
                   id="outlined"
                   label="Localidad"
                   variant="outlined"
                   name="localidad"
                   value={newProfileData.localidad} 
                   onChange={handleInputChange}
                  />
                </FormControl>
              <FormControl sx={{ m: 1, width: '50%', '@media (max-width: 530px)': {
                  width: '90%',
                  }, }} >
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Email"
                  disabled
                  variant="outlined"
                  type="text"
                  id="email"
                  name="email"
                  value={userData?.username}
                />
              </FormControl>
            </div>

            <FormControl sx={{margin:'0 auto', maxWidth:200, display:'flex'}}>
              <Button sx={{marginTop:'6px'}} type="submit" disabled={loading} >{loading?'ENVIANDO...': 'Actualizar' }</Button>
            </FormControl>
          </Box>
        </article>

        {productosFavoritos.length>0 && <h4 className={styles.titulosGenerales}>Favoritos</h4>}
        
        <div className={styles.favs}>
          
          {productosFavoritos?.map( item => <ImgMediaCard item={item} key={item.id} favorito={true} logueado={true} handleFavorito={handleFavorito}/>)}
        </div>

        <h4 className={styles.titulosGenerales} >Reservas</h4>
        {/* TABLA DE RESERVAS */}
        <TableContainer
          component={Paper}
          style={{
            marginTop: "40px",
            marginBottom: "70px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            maxWidth: 800,
          }}
        >
          <Table sx={{ minWidth: 400,maxWidth:900 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">RESERVAS</TableCell>
                <TableCell align="left">Fecha de Reserva</TableCell>
                <TableCell align="right">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow
                  key={reserva.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {reserva.id}
                  </TableCell>
                  <TableCell align="left">{reserva.nombre_producto}</TableCell>
                  <TableCell align="left">{/* reserva.fecha_reserva */dayjs(reserva.fecha_reserva).format('DD[/]MM[/]YYYY')}</TableCell>

                  <TableCell align="right">
                    <button
                      className="edit-btn"
                      /* onClick={() => {
                        eliminar(row.id, row.nombreproducto);
                      }} */
                    >
                      Descargar presupuesto
                    </button>
                    {/* <Link to={`/productos/${row.producto}`}>
                  <button className="edit-btn">
                      Ver producto
                    </button>
                </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default ProfileDetail;
