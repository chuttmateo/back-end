import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./home.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";

const apiUrl = "http://3.144.46.39:8080/productos";

const Home = () => {
  const [productState, setProductState] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isRandomized, setIsRandomized] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(apiUrl);
      const data = response.data;
      setProductState(data);
      aleatorizeProducts(data);
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

  return (
    <main className="main">
      <section className={styles.SearchBar}>
        <input
          type="text"
          placeholder="Ej: Piloto Privado, uniforme, hospedaje.."
        />
      </section>
      <section className={styles.Categories}>
        <h2>Categorías</h2>
        <div className={styles.CategoryButtons}>
          <button>Licencias</button>
          <button>Uniforme</button>
          <button>Merchandising</button>
          <button>Horas libres</button>
        </div>
      </section>

      <div className={styles.contenedor}>
        <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      <section className={styles.NavigateButtons}>
        <button onClick={handleStartClick}>Inicio</button>
        <button onClick={handlePrevClick}>Prev</button>
        <strong>{startIndex}</strong>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handleFinishClick}>Final</button>
      </section>
    </main>
  );
};

export default Home;
