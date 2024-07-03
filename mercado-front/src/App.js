//import logo from './logo.svg';
import './Style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import ProductList from './Component/Product/ProductList';
import AddProduct from './Component/Product/AddProduct';
import TypeList from './Component/Type/TypeList';
import AddType from './Component/Type/TypeAdd';
import Sale from './Component/Sale/Sale';
import SaleList from './Component/Sale/SaleList';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <ProductList/> } />
        <Route path="/productlist" element={ <ProductList/> } />
        <Route path="/addproduct" element={ <AddProduct/> } />
        <Route path="/typelist" element={ <TypeList/> } />
        <Route path="/addtype" element={ <AddType/> } />
        <Route path="/sale" element={ <Sale/> } />
        <Route path="/salelist" element={ <SaleList/> } />
      </Routes>
    </div>
  );
}

export default App;
