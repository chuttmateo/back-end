import React, { createContext, useContext, useState } from 'react'


const GlobalState = createContext();

const Context = ({children}) => {

    const [categorySelected, setCategorySelected] = useState("TODOS");
    const [loggedState,setLoggedState] = useState(false)

    return (
        <GlobalState.Provider value={{categorySelected, setCategorySelected,loggedState, setLoggedState}}>
            {children}
        </GlobalState.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalState)

export default Context