import { Box, Container, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //Cuando tenga los requerimientos en las cantidad de caracteres, lo voy a modificar acá
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateName(name) {
    return name.trim().length >= 3;
  }

  function validateLastName(lastName) {
    return lastName.trim().length >= 3;
  }

  function validatePassword(password) {
    return password.trim().length >= 3;
  }

  function submit(e) {
    e.preventDefault();

    if (!validateEmail(username)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    setEmailError("");

    if (!validateName(firstname)) {
      setFirstnameError("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    setFirstnameError("");

    if (!validateLastName(lastname)) {
      setLastnameError("El apellido debe tener al menos 3 caracteres.");
      return;
    }
    setLastnameError("");

    if (!validatePassword(password)) {
      setPasswordError("La contraseña debe tener al menos 3 caracteres.");
      return;
    }
    setLastnameError("");

    axios
      .post("http://3.144.46.39:8080/auth/register", {
        username,
        firstname,
        lastname,
        password,
      })
      .then(function (response) {


        if (response.status == 200) {
          alert("Usuario creado correctamente")
          navigate("/login");
        }

        console.log(response);
      })
      .catch(function (error) {
        if (error?.response?.status == 403) {
          setEmailError("Este email ya se encuentra regitrado")
        } else {
          alert("Error al intentar crear el usuario", error.message)
        }

      });
  }

  return (
    <div className="main">
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "#1E1E1E",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        noValidate
        autoComplete="off"
      >
        <Container sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <img src="logoazul.png" style={{ width: "50px", height: "auto" }} />
          <h4>Panel de Registro</h4>
        </Container>
        <TextField
          id="username"
          label="Email"
          //variant="standard"
          value={username}
          error={emailError !== ""}
          helperText={emailError}
          onChange={(e) => {
            setUsername(e.target.value);
            setEmailError("");
          }}
        />
        <TextField
          id="firstname"
          label="Nombre"
          //variant="standard"
          value={firstname}
          error={firstnameError !== ""}
          helperText={firstnameError}
          onChange={(e) => {
            setFirstnameError("");
            setFirstname(e.target.value);
          }}
        />
        <TextField
          id="lastname"
          label="Apellido"
          //variant="standard"
          value={lastname}
          error={lastnameError !== ""}
          helperText={lastnameError}
          onChange={(e) => {
            setLastnameError("");
            setLastname(e.target.value);
          }}
        />
        <TextField
          id="password"
          value={password}
          error={passwordError !== ""}
          helperText={passwordError}
          onChange={(e) => {
            setPasswordError("");
            setPassword(e.target.value);
          }}
          label="Contraseña"
          //variant="standard"
          type="password"
        />
        <button type="submit" className="button-primary">
          Crear cuenta
        </button>
        <Link to={"/login"}>¿Ya tienes una cuenta? Inicia sesión aquí</Link>
      </Box>
    </div>
  );
}

export default Register;
