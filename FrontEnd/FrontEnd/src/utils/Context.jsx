import React, { createContext, useContext, useState } from 'react'


const GlobalState = createContext();

const Context = ({children}) => {

    const [categorySelected, setCategorySelected] = useState("TODOS");
    const [loggedState,setLoggedState] = useState(false);
    const [productState, setProductState] = useState([]);
    const [valueDate, setValueDate] = useState([
        null,
        null
      ]);

    return (
        <GlobalState.Provider value={{categorySelected, setCategorySelected,loggedState, setLoggedState, productState, setProductState, valueDate, setValueDate}}>
            {children}
        </GlobalState.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalState)

export default Context