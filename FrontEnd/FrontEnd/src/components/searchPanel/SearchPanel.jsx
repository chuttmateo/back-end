import { FiSearch } from 'react-icons/fi'
import styles from "./search.module.css";
import CustomDatePicker from './CustomDatePicker';
import ScrollableTabsButtonAuto from '../scrollableTabsButtonAuto/ScrollableTabsButtonAuto';

const SearchPanel = ({categories,
  handleCategoryButton, handleSearch, setStartIndex, esCategoriaReservable}) => {
    
  return (
    <>
        <main className={styles.mainSearch}>
        
            <section className={styles.categories}>
                <h2 className={styles.tituloCategorias}>SELECCIONA UNA CATEGORIA</h2>
                <ScrollableTabsButtonAuto  setStartIndex={setStartIndex} categories={categories} handleCategoryButton={handleCategoryButton}/>
            </section>
            {esCategoriaReservable &&
            <section className={styles.dateSection}>
                <label className={styles.dateLabel}><h2>QUE FECHA BUSCAS?</h2></label>
                {<CustomDatePicker />}
                <button onClick={handleSearch} className={styles.searchBtn}><FiSearch className={styles.searchIcon} /></button>
            </section>
            }
        
        </main>
    </>
  )
}

export default SearchPanel

{/* <section className={styles.searchProductsSection}>
            <p>Busca tus productos</p> */}