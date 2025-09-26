import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SetGridContext from './Components/Contexts/GridContext.jsx'
import FilterContext  from './Components/Contexts/FilterContex.jsx'
import {store} from "../Redux/store.js"
import { Provider } from 'react-redux'
import  ProductContext  from './Components/Contexts/PopupContext.jsx'
import AuthProvider from './Components/Contexts/AuthContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <AuthProvider>
    <SetGridContext>
    <FilterContext>
    <ProductContext>
      <Routes>
        <Route path='/' element={<App/>}/>
    </Routes>
    </ProductContext> 
    </FilterContext>
    </SetGridContext>
    </AuthProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
