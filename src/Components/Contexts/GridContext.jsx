import React from 'react'
import { createContext , useState} from 'react'

export const SetGridContext = createContext()

const GridContext = ({children}) => {
    const [grid , setGrid] = useState(true)
    
    const toggleGrid = () =>{
        setGrid(!grid)
    }

  return (
    <SetGridContext.Provider value={{grid , toggleGrid}}>
        {children}
    </SetGridContext.Provider>
  )
}


export default GridContext 