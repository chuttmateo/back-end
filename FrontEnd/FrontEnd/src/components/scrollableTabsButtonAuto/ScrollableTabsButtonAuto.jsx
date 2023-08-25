import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonAuto({ categories, handleCategoryButton }) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Tabs
                sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab value={0} label="TODOS" onClick={() => handleCategoryButton("TODOS")} />
                {categories?.map(item => {
                    return (<Tab key={item.id} label={item.nombre} value={item.id} onClick={() => handleCategoryButton(item.nombre)} />)
                })}
                {/*{categories?.map(item => {
                    return (<Tab key={item.id} label="asdf" value={item.id} />)
                })}*/}

                {/*{categories?.map(item => <div key={item.id} className={styles.contenedorCategoriaIndividual}>
              <button onClick={handleCategoryButton} value={item.nombre} className={`${styles.defaultButton} ${categorySelected === item && styles.selectedButton
                }`} style={{ backgroundImage: `url(${item.image})` }}>
              </button>
              <p style={{ paddingTop: '2px' }}>{item.nombre}</p>

            </div>)}*/}
            </Tabs>
        </Box>
    );
}