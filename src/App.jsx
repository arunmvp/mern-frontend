import { useEffect } from "react";
import "./App.css";
import Herosection from "./Components/Herosection/Herosection";
import Navbar from "./Components/Navbar/Navbar";
import ProductfilterBar from "./Components/ProductFilter/ProductFilterBar";
import ProductsGrid from "./Components/ProductsGrid/ProductsGrid";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { allproducts } from "../Redux/ProductsSlice";
import ProductPopup from "./Components/ProductDetail/ProductPopup";
import Footer from "./Components/Footer/Footer";


function App() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(allproducts());
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div>
          <Herosection />
          <ProductfilterBar/>
          <ProductsGrid/>
          <ProductPopup/>
        </div>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
