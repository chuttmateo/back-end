import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./home.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";
import {useTheme } from "@mui/material";
import Banner from "../../components/banner/Banner";
import { useGlobalState } from "../../utils/Context";

const apiUrl = "http://3.144.46.39:8080/productos";

const Home = () => {

  const {categorySelected, setCategorySelected} = useGlobalState()
  
  const theme = useTheme();
  console.log(theme.palette.mode);

  const [productState, setProductState] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [filtrado, setFiltrado] = useState([])
  const [imagen, setImagen] = useState("");
  const [categories, setCategories] = useState([])

  const aleatorizeProducts = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const limitViewProducts = (array) => {
    const arrayLimitedViewProducts = [];
    for (let i = 0; i < array.length; i += 10) {
      arrayLimitedViewProducts.push(array.slice(i, i + 10));
    }
    return arrayLimitedViewProducts;
  };

  const handleCategoryButton = (e) => {
    setCategorySelected(e.target.value)
    setFiltrado(e.target.value === 'Todos' ? productState : productState.filter((item) => item.categoria === e.target.value));
  }

  const findCategories = (data) =>{
    const datos = data.map(item => item.categoria)
    const actualCategories = [...new Set(datos)]
    /* etCategories(...new Set(data.map(item => item.categoria))) */
    setCategories(actualCategories)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiUrl);
      const data = response.data;
      setProductState(data);
      aleatorizeProducts(data);
      setImagen(getRandomImage())
      findCategories(data)
}

    fetchData();
  }, []);  


  const limitedViewProducts = limitViewProducts(productState);

  const handleNextClick = () => {
    startIndex + 1 < limitedViewProducts.length &&
      setStartIndex(startIndex + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevClick = () => {
    startIndex - 1 >= 0 && setStartIndex(startIndex - 1);
    window.scrollTo(0, 0);
  };

  const handleStartClick = () => {
    setStartIndex(0);
    window.scrollTo(0, 0);
  };
  const handleFinishClick = () => {
    setStartIndex(limitedViewProducts.length - 1);
    window.scrollTo(0, 0);
  };
  const aviones = ["avion-pequena.jpg", "avion-pequena-2.jpg"]
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * aviones.length);
    return aviones[randomIndex];
  }


  return (
    <main className="main">
      <Banner img={imagen}/>
        {/* <input
          type="text"
          placeholder="Ej: Piloto Privado, uniforme, hospedaje.."
        /> */}

      <section className={styles.SearchBar}>
      </section>
      <section className={styles.Categories}>
        <h2>Categorías</h2>
        <div className={styles.CategoryButtons}>
          {/* {categories?.map(item => <button key={item.id} onClick={handleCategoryButton} value= {item.categoria}className= {`${styles.defaultButton} ${category === item.categoria && styles.selectedButton }`} >{item.categoria}</button>)} */}

          {categories?.map((item, index) => <button key={index} onClick={handleCategoryButton} value= {item}className= {`${styles.defaultButton} ${categorySelected === item && styles.selectedButton }`} >{item}</button>)} 

          {/* <button onClick={handleCategoryButton} value= "Licencias" className= {`${styles.defaultButton} ${categorySelected === "Licencias" && styles.selectedButton }`} >Licencias y habilitaciones</button>
          <button onClick={handleCategoryButton} value= "Uniforme" className={`${styles.defaultButton} ${categorySelected === "Uniforme" && styles.selectedButton}`}>Uniforme</button>
          <button onClick={handleCategoryButton} value= "Merchandising" className={`${styles.defaultButton} ${categorySelected === "Merchandising" && styles.selectedButton}`}>Merchandising</button> */}
          {/* <button onClick={handleCategoryButton} value= "Licencias" className="button-primary">Horas libres</button> */}
        </div>
      </section>

      

      <div className={styles.contenedor}>
      {categorySelected === 'Licencias' && <p className={styles.results}>Licencias y habilitaciones ({filtrado.length})</p>}
      {categorySelected === 'Uniforme' && <p className={styles.results} >Uniformes ({filtrado.length})</p>}
      {categorySelected === 'Merchandising' && <p className={styles.results} >Merchandising ({filtrado.length})</p>}

        {categorySelected === 'Todos' ? <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard item={item} key={item.id} />
          ))}
        </div> : <div className={styles.SectionProductCard}>
          {filtrado?.map((item) => (
            <ImgMediaCard item={item} key={item.id} />
          ))}
        </div>  }

        
      </div>

      <section className={styles.NavigateButtons}>
        <button onClick={handleStartClick} className="button-primary">Inicio</button>
        <button onClick={handlePrevClick} className="button-primary">Prev</button>
        <strong>{startIndex}</strong>
        <button onClick={handleNextClick} className="button-primary">Next</button>
        <button onClick={handleFinishClick} className="button-primary">Final</button>
      </section>      
    </main>
  );
};

export default Home;
