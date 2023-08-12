import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.div}>
      <Link className={styles.link} to={"/home"}>
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
        <button className="button-primary">Crear cuenta</button>
        <button className="button-primary">Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Header;
