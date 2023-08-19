import React, { createContext, useContext, useState } from 'react'


const GlobalState = createContext();

const Context = ({children}) => {

    const [categorySelected, setCategorySelected] = useState("Todos");


    return (
        <GlobalState.Provider value={{categorySelected, setCategorySelected}}>
            {children}
        </GlobalState.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalState)

export default Context