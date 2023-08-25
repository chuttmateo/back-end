import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./home.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";
import Banner from "../../components/banner/Banner";
import { useGlobalState } from "../../utils/Context";
import ImgMediaSkeleton from '../../components/cardStyled/ImgMediaSkeleton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ScrollableTabsButtonAuto from "../../components/scrollableTabsButtonAuto/ScrollableTabsButtonAuto";

const apiUrl = "http://3.144.46.39:8080/productos";
const apiUrlCat = "http://3.144.46.39:8080/categorias";

const Home = () => {
  const { categorySelected, setCategorySelected } = useGlobalState();

  /*const theme = useTheme();*/
  /* console.log(theme.palette.mode); */

  const [productState, setProductState] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [filtrado, setFiltrado] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setCategorySelected(e);
    setFiltrado(
      e === "TODOS"
        ? productState
        : productState.filter((item) => item.categoria === e)
    );
  };

  async function findCategories() {
    const response = await axios.get(apiUrlCat);
    const data = response.data;
    /* const datos = data.map((item) => item.nombre); */
    setCategories(data);
    categories?.map(item => console.log(item))
  }

  useEffect(() => {
    try {
      // eslint-disable-next-line no-inner-declarations
      async function fetchData() {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setProductState(data);
        aleatorizeProducts(data);
      }
      findCategories();
      fetchData();

    } catch (error) {
      console.log(error);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeoutId);
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
      <Banner />
      <section className={styles.Categories}>
        <h2>Categorías</h2>
        {categories[0]?.id !== null ? <ScrollableTabsButtonAuto categories={categories} styles={styles} handleCategoryButton={handleCategoryButton} categorySelected={categorySelected} /> : <h2>sdf</h2>}
      </section>

      <div className={styles.contenedor}>
        {categorySelected != "Todos" && (
          <p className={styles.results}>
            {categorySelected} ({filtrado.length})
          </p>
        )}




        {/* {
          if (categorySelected === "Todos" && loading ) {
            [1, 2, 3].map(item => <imgMediaSkeleton key={item}/>)
          }
        } */}

        {loading === true && (<div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaSkeleton key={item.id} />
          ))}
        </div>)}

        {categorySelected === "Todos" && loading === false && <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard item={item} key={item.id} />
          ))}
        </div>}

        {categorySelected != "Todos" && loading === false && (
          <div className={styles.SectionProductCard}>
            {filtrado?.map((item) => (
              <ImgMediaCard item={item} key={item.id} />
            ))}
          </div>
        )}


        {/*   <ImgMediaSkeleton />
        {categorySelected === "Todos" ? (
          <div className={styles.SectionProductCard}>
            {limitedViewProducts[startIndex]?.map((item) => (
              <ImgMediaCard item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className={styles.SectionProductCard}>
            {filtrado?.map((item) => (
              <ImgMediaCard item={item} key={item.id} />
            ))}
          </div>
        )} */}
      </div>

      <section className={styles.NavigateButtons}>
        <button onClick={handleStartClick} className="button-primary">
          Inicio
        </button>
        <button onClick={handlePrevClick} className="button-primary">
          <FiChevronLeft />
        </button>
        <strong>{startIndex}</strong>
        <button onClick={handleNextClick} className="button-primary">
          <FiChevronRight />
        </button>
        <button onClick={handleFinishClick} className="button-primary">
          Final
        </button>
      </section>
    </main>
  );
};

export default Home;



