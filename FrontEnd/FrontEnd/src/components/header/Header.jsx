import { useGlobalState } from "../../utils/Context";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {

  const {setCategorySelected} = useGlobalState()

  const handleLink = () =>{
    setCategorySelected("Todos")
  }

  return (
    <div className={styles.div}>
      <Link className={styles.link} to={"/home"} onClick={handleLink}> 
        <div className={styles.contenedor}>
          <img
            className={styles.isologotipo}
            src="/isologotipo1.png"
            alt="iso logotipo"
          />
          <img
            className={styles.logoazul}
            src="/logoazul-degrade.png"
            alt="iso logotipo"
          />
        </div>
      </Link>
      
      <div className={styles.contenedor}>
        <Link className="button-primary" to={"/register"}>Crear cuenta</Link>
        <button className="button-primary">Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Header;
