import axios from "axios";
import {  useReducer} from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const apiUsers = "http://3.144.46.39:8080/auth/login"
    

    const initialLoginStates = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: ''
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
    }else if(!validEmail.test(loginStates.username)){
        dispatch({ type: 'SET_USERNAME_ERROR', payload: 'Error: El formato de correo es inválido' });
    }
    else if(loginStates.password === ""){
        dispatch({ type: 'SET_PASSWORD_ERROR', payload: 'Error: Este campo es obligatorio' });
  }else{
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
    console.error("Error de inicio de sesión:", error);
  }
}
}

    return (
    <>
    <div className="login-container" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto', marginTop: '150px'}}>
        <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>Iniciar Sesión</h2>
        <form className="login-form" method="post">
            <div className="form-group" style={{ marginBottom: '15px' }}>
            {loginStates.usernameError && <div className="error-message">{loginStates.usernameError}</div>}
                <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Ingrese su Email:</label>
                <input onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })} />
            </div>
            <div className="form-group" style={{ marginBottom: '15px' }}>
            {loginStates.passwordError && <div className="error-message">{loginStates.passwordError}</div>}
        
                <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
                <input type="password" onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}/>
            </div>
            <button onClick={handleSubmit} className="login-btn" style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>Iniciar Sesión</button>
        </form>
    </div>
    </>
  )
}


export default Login