import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.div}>
      <div className={styles.contenedor}>
        <img className={styles.img} src="/logoblanco.png" alt="iso logotipo" />
        <p>© InFlight 2023</p>
      </div>
    </div>
  );
}

export default Footer;
