import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./home.module.css";
import ImgMediaCard from "../../components/cardStyled/ImgMediaCard";
import Banner from "../../components/banner/Banner";
import { useGlobalState } from "../../utils/Context";
import ImgMediaSkeleton from '../../components/cardStyled/ImgMediaSkeleton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SearchPanel from "../../components/searchPanel/SearchPanel";

const apiUrl = "http://3.144.46.39:8080/productos";
const apiUrlCat = "http://3.144.46.39:8080/categorias";

const Home = () => {
  const { categorySelected, setCategorySelected } = useGlobalState();
  const {productState, setProductState} = useGlobalState();
  const { valueDate } = useGlobalState();
  /*const theme = useTheme();*/
  /* console.log(theme.palette.mode); */

  
  const [startIndex, setStartIndex] = useState(0);
  const [filtrado, setFiltrado] = useState(productState);
  const [buscado, setBuscado] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearched, setIsSearched] = useState(false)
  const index = startIndex;
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
    setIsSearched(false);
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

  
  const handleSearch = () => {
    setBuscado(filtrado.filter((item) => {
      return item.cursos.some((cursada) => {
        console.log(cursada.fechaInicio);
        console.log(cursada.fechaFin);
        return (
          cursada.fechaInicio >= valueDate[0] &&
          cursada.fechaFin <= valueDate[1]
        );
      });
    }));
    
    setIsSearched(true)
    console.log(buscado);
  }

  useEffect(() => {
    try {
      // eslint-disable-next-line no-inner-declarations
      async function fetchData() {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setProductState(data);

        aleatorizeProducts(data);

        //EL PROBLEMA DEL TODOS lo solucione seteando el filtrado con la data
        setFiltrado(data)
        setCategorySelected("TODOS")
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
      if(startIndex != limitedViewProducts.length - 1){
        window.scrollTo(0, 0);
      }
  };

  const handlePrevClick = () => {
    startIndex - 1 >= 0 && setStartIndex(startIndex - 1);
    if(startIndex != 0){
      window.scrollTo(0, 0);
    }
    
  };

  const handleStartClick = () => {
    if(startIndex != 0){
      setStartIndex(0);
      window.scrollTo(0, 0);
    }
  };
  const handleFinishClick = () => {
    
    if(startIndex != limitedViewProducts.length - 1){
      setStartIndex(limitedViewProducts.length - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="main">
      <Banner />
      <SearchPanel categories={categories} handleCategoryButton={handleCategoryButton} categorySelected={categorySelected} handleSearch={handleSearch}/>
      <div className={styles.contenedor}>
                  <p className={styles.results}>
            {categorySelected.toUpperCase()} ({isSearched ? buscado.length: filtrado.length })
          </p> 
                {/*{categorySelected !== "TODOS" && (
          <p className={styles.results}>
            {categorySelected} ({filtrado.length})
          </p>
        )}*/}
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

        {isSearched === true && <div className={styles.SectionProductCard}>
          {buscado?.map((item) => (
              <ImgMediaCard item={item} key={item.id} />
            ))}
          </div>}

        {categorySelected === "TODOS" && loading === false && isSearched === false && <div className={styles.SectionProductCard}>
          {limitedViewProducts[startIndex]?.map((item) => (
            <ImgMediaCard item={item} key={item.id} />
          ))}
        </div>}

        

        {categorySelected != "TODOS" && loading === false && isSearched === false && (
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
        <strong>{index + 1}</strong>
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



