import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";

export default function ScrollableTabsButtonAuto({
  categories,
  handleCategoryButton, setStartIndex
}) {
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartIndex(0);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", borderRadius: "120% 10% 10% 0%"}}>
      <Tabs
        sx={{ display: "flex", justifyContent: "space-evenly", borderRadius: "10px 10px 10px 10px"}}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab
              sx={{}}
              icon={
                <Avatar
                  sx={{ width: 90, height: 90}}
                  alt="logo"
                  src='./logoazul.png'
                 
                />
              }

          value={0}
          label="TODOS"
          onClick={() => handleCategoryButton({nombre:"TODOS", reservable: true})}
        />
        {categories?.map((item) => {
          return (
            <Tab
              sx={{padding:'10px 30px'}}
              icon={
                <Avatar
                  sx={{ width: 100, height: 100}}
                  alt={item.nombre}
                  src={item.image}
                 
                />
              }
              key={item.id}
              label={item.nombre}
              value={item.id}
              onClick={() => handleCategoryButton(item)}
            />
          );
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
