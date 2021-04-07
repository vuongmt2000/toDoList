import React,{createContext, useState} from 'react'
export const UserContext = createContext();

const DataContextProvider =({children})=>{
    //state
    const [dataContext1, setDataContext1] = useState([]);
    const [local, setLocal] = useState(0)
    console.log('dataContext1', local)
    // context data 
    const contextData = {
        dataContext1,
        setDataContext1,
        local,
        setLocal
    }
    
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}

export default DataContextProvider;