import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/Context";
import styles from "./header.module.css";
import { Link} from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const {loggedState, setLoggedState} = useGlobalState()
  const {setCategorySelected} = useGlobalState()
  
  useEffect(() => { 
    userData != null ? setLoggedState(true) : setLoggedState(false);
  }, [userData])
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownVisible(false);
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  

  const handleLink = () =>{
    setCategorySelected("Todos")
  }

  const handleLogout = () =>{
    localStorage.removeItem('userData');
    setDropdownVisible(false)
  }

  const handleInitials = () =>{
    if(userData){
      const firstNameInitial = userData.firstname.charAt(0).toUpperCase();
      const lastNameInitial = userData.lastname.charAt(0).toUpperCase();

      return (
        <div className={styles.userInitialsCircle}>
          <span className={styles.userInitials}>
            {`${firstNameInitial}${lastNameInitial}`}
          </span>
        </div>
      );
    } else {
      return (
        <div className={styles.userInitialsCircle}>
          <span className={styles.userInitials}>UserName</span>
        </div>
      );
    }
    //   return `${firstNameInitial}${lastNameInitial}`
    // } else{
    //   return "UserName"
    // }
  }

   
  //   <div className={styles.div}>
  //     <Link className={styles.link} to={"/home"} onClick={handleLink}> 
  //       <div className={styles.contenedor}>
  //         <img
  //           className={styles.isologotipo}
  //           src="/isologotipo1.png"
  //           alt="iso logotipo"
  //         />
  //         <img
  //           className={styles.logoazul}
  //           src="/logoazul-degrade.png"
  //           alt="iso logotipo"
  //         />
  //       </div>
  //     </Link>
      
  //     <div className={styles.contenedor}>
  //     {loggedState ? 
  //       <div className="dropdown">
  //       <div className="dropdown-toggle" onClick={toggleDropdown}>
  //         <span className="user-initials">{handleInitials()}</span>
  //       </div>
  //       {dropdownVisible && (
  //         <ul className="dropdown-content">
  //           <li><Link to={`/profile/${userData.username}`}>
  //             Ver perfil
  //               </Link></li>
  //           {userData ? (
  //             userData.role === "ADMIN" && (
  //             <li><Link to="/administracion">Panel de administración</Link></li>)
  //             ): null}
  //           <li><Link to="/home" onClick={handleLogout}>
  //             Cerrar sesión
  //               </Link></li>
  //         </ul>
  //       )}
  //     </div>
  //      : <div>
  //       <Link className="button-primary" to={"/register"}>Crear cuenta</Link>
  //       <Link className="button-primary" to={"/login"}>Iniciar sesión</Link>
  //       </div>
  //     }
  //     </div>
  //   </div>
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
        
        <div className={styles.searchBar}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="¿Qué estás buscando?"
          />
        </div>
      </div>

      <div className={styles.contenedor}>
      {loggedState ? 
        <div className={styles.dropdown}>
        <div className={styles.dropdownToggle} onClick={toggleDropdown}>
              <span>
          <span className={styles.userInitials}>{handleInitials()}</span>
              </span>
        </div>
        {dropdownVisible && (
          <ul className={styles.dropdownContent}>
            <li><Link to={`/profile/${userData.username}`}>
              Ver perfil
                </Link></li>
            {userData ? (
              userData.role === "ADMIN" && (
              <li><Link to="/administracion">Panel de administración</Link></li>)
              ): null}
            <li><Link to="/home" onClick={handleLogout}>
              Cerrar sesión
                </Link></li>
          </ul>
        )}
      </div>
       : <div>
        <Link className="button-primary-distinto" to={"/register"}>Crear cuenta</Link>
        <Link className="button-primary" to={"/login"}>Iniciar sesión</Link>
        </div>
      }
      </div>
    </div>
  );
};

export default Header;
