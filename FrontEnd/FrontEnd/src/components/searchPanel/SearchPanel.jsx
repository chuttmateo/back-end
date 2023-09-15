import { FiSearch } from 'react-icons/fi'
import styles from "./search.module.css";
import CustomDatePicker from './CustomDatePicker';
import ScrollableTabsButtonAuto from '../scrollableTabsButtonAuto/ScrollableTabsButtonAuto';
import DatePicker from 'react-multi-date-picker';

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
              <p className={styles.textFecha}>Fecha desde</p>
                {/* <label className={styles.dateLabel}><h2 className={styles.labelH2}>BUSCAR POR FECHA</h2></label> */}
                {/* {<CustomDatePicker />} */}
                {<DatePicker placeholder='seleccione una fecha'/>}
                <p className={styles.textFecha}>Fecha hasta</p>
                {<DatePicker placeholder='seleccione una fecha'/>}
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