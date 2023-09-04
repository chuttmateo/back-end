import { FiSearch } from 'react-icons/fi'
import styles from "./search.module.css";
import CustomDatePicker from './CustomDatePicker';
import ScrollableTabsButtonAuto from '../scrollableTabsButtonAuto/ScrollableTabsButtonAuto';

const SearchPanel = ({categories,
  handleCategoryButton, handleSearch}) => {

    
  return (
    <>
        <main className={styles.mainSearch}>
        <section className={styles.searchProductsSection}>
            <p>Busca tus productos</p>
            <section className={styles.categories}>
                <h2>CATEGORÍAS</h2>
                <ScrollableTabsButtonAuto categories={categories} handleCategoryButton={handleCategoryButton}/>
            </section>
            <section className={styles.dateSection} >
                <label className={styles.dateLabel}><h2>FECHAS:</h2></label>
                {<CustomDatePicker/>}
            </section>
            <button onClick={handleSearch} className={styles.searchBtn}><FiSearch className={styles.searchIcon} /></button>
        </section>
        </main>
    </>
  )
}

export default SearchPanel