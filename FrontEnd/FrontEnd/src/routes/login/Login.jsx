import axios from "axios";
import {  useReducer } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useGlobalState } from "../../utils/Context";
import { Box, Container, TextField } from "@mui/material";


const Login = () => {
  
  const {setCategorySelected} = useGlobalState()
  const apiUsers = "http://3.144.46.39:8080/auth/login";

  const initialLoginStates = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    credentialError:""
  };

  const reducer = (state, action) => {
           switch (action.type) {
             case 'SET_USERNAME':
               return { ...state, username: action.payload};
             case 'SET_PASSWORD':
               return { ...state, password: action.payload};
             case 'SET_USERNAME_ERROR':
               return { ...state, usernameError: action.payload};
             case 'SET_PASSWORD_ERROR':
               return { ...state, passwordError: action.payload};
               case 'SET_CREDENTIAL_ERROR':
                return { ...state, credentialError: action.payload};
             
             default:
               return state;
           }
         };

         const [loginStates, dispatch] = useReducer(reducer, initialLoginStates);
             const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
           const handleSubmit = async (e) => {
             e.preventDefault()
             dispatch({ type: 'SET_USERNAME_ERROR', payload: '' });
             dispatch({ type: 'SET_PASSWORD_ERROR', payload: '' });
             
             if(loginStates.username === ""){
                 dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Error: Este campo es obligatorio' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
             }else if(!validEmail.test(loginStates.username)){
                 dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Error: El formato de correo es inválido' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
             }
             else if(loginStates.password === ""){
                 dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Error: Este campo es obligatorio' });
                 dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: '' });
           }
           else{
             try {
                 const response = await axios.post(apiUsers, {
                     username: loginStates.username,
                     password: loginStates.password,
                   }, {
                     headers: {
                       'Content-Type': 'application/json'
                     }
                   });
             if (response.status === 200) {
               localStorage.setItem('userData', JSON.stringify(response.data))
               window.location.href = "/home";
             } 
           } catch (error) {
            if(error.response.status === 403){
              dispatch({ type: 'SET_CREDENTIAL_ERROR', payload: 'Error: El nombre de usuario o la contraseña son incorrectos o no existen' });
            
             }
           }
         }
         }

         const handleLink = () =>{
          setCategorySelected("Todos")
        }

         const errorMessage = {
          color: "red", // Rojo suave en formato hexadecimal
          backgroundColor: "#FFD9D9", // Rojo claro en formato hexadecimal
          fontSize: "14px",
          padding: "8px",
          borderRadius: "5px",
          marginTop: "10px"
         }
         return (
          <>
            <div
              className="container-general"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                // backgroundImage: 'url("/avion1.jpeg")',
                // backgroundRepeat: "no-repeat",
                // height: "100vh" 
              }}
            >
              <img src="/avion1.jpeg" alt="avion" style={{
                height: "100vh",
                width:"100%"
              }}/>
              <div
                className="login-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#3A3A3A",
                  padding: "20px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  width: "35vw",
                  height: "100vh",
                  
                }}
              >
                <section className="contenedorForm" style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                <Link to={"/home"} onClick={handleLink}> 
                <img src="/logoazul-degrade.png" alt="logoazul" 
                style={{
                  width: "4vw",
                  marginTop: "25px"
                }}/>
                </Link>
                
                <h2 style={{ marginBottom: "10px", fontSize: "40px", color: "white", textAlign: 'center', marginTop: "30px" }}>
                  Iniciar Sesion
                </h2>
                {loginStates.credentialError && (
                  <div className="error-message" style={errorMessage}>{loginStates.credentialError}</div>
                )}
                <form
                  className="login-form"
                  method="post"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "25px",                    
                  }}
                >
                  <div className="form-group" style={{ marginBottom: "15px", width: "32vw"}}>
                    
                    {loginStates.usernameError && (
                      <div className="error-message" style={errorMessage}>{loginStates.usernameError}</div>
                    )}
                    <input
                    
                      onChange={(e) =>
                        dispatch({ type: "SET_USERNAME", payload: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "0.5px solid #BFC0C1",
                        backgroundColor: "#3A3A3A",
                        borderRadius: "3px",
                        fontSize: "20px",
                        color: "white",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        outline: "none",
                        cursor: "pointer",
                       
                      }}
                      placeholder="Ingrese su email" // Placeholder actualizado
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px", width: "32vw" }}>
                    
                    {loginStates.passwordError && (
                      <div className="error-message" style={errorMessage}>{loginStates.passwordError}</div>
                    )}
                    <input
                      type="password"
                      
                      onChange={(e) =>
                        dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "0.5px solid #BFC0C1",
                        borderRadius: "3px",
                        backgroundColor: "#3A3A3A",
                        fontSize: "20px",
                        color: "white",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        outline: "none",
                        cursor: "pointer",
                        
                        
                      }}
                      placeholder="Ingrese su contraseña"
  
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="login-btn"
                    style={{
                      fontSize: "12px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "100px",
                      cursor: "pointer",
                      marginTop: "15px",
                      width: "100%"
                    }}
                  >
                    Iniciar Sesión
                  </button>
                </form>
                <Link
                  to={"/register"}
                  style={{
                    textDecoration: "none",
                    padding: "50px",
                    
                    fontSize: "12px"
                  }}
                >
                  ¿No tienes una cuenta? Regístrate aquí
                </Link>
                
                </section>
              </div>
            </div>
          </>
        );
        };

export default Login;






