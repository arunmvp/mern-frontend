import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'


export const FilterContext = createContext()

const FilterContex = ({children}) => {

    const [filter , setFilter] = useState("All") 
    const [count , setCount] = useState(0)
    const [brand, setBrand] = useState(null)
    const [priceRange, setPriceRange] = useState([10, 200]);

    const toggleFilter = (e) =>{
        setFilter(e.target.value )
    }
    const setCountItems = (num) =>{
        setCount(num)
        console.log(num);
    }
    const setBrandFilter = (brand) =>{
        setBrand(brand)
        // alert(`Brand filter set to: ${brand}`)
    }
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        
      }

  return (
    <FilterContext.Provider value={{filter , toggleFilter, setCountItems, count, brand, setBrandFilter, priceRange, handlePriceChange}}>
        {children}
    </FilterContext.Provider>
  )
}

export default FilterContex