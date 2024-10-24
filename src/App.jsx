import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Calculator from "./pages/Calculator/Calculator";
import Todo from "./pages/Todo/Todo";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import { fetchProducts } from "./data/products";

import "./App.css";
import Products from "./pages/Products/Products";
import Animation from "./pages/Animation/Animation";
import Components from "./pages/Components/Components";
import Carts from "./pages/Carts/Carts";
import Login from "./pages/Login/Login";

// HashRouter, BrowserRouter, MemoryRouter
// HashRouter: URL: #/home
// BrowserRouter: URL: /home
// MemoryRouter: URL:

const intTab = "Home";
function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const [tab, setTab] = useState('');
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);
  useEffect(() => console.log(products), [products]);

  // useEffect(() => {
  //   setTab(intTab);
  // }, []); // first load

  if (token === '') {
   return <Login setToken={setToken} setRole={setRole} />
  } else {
   return (
    <div className="app-container">
      <HashRouter>
        <Routes>
          <Route
            element={
              <Layout
                tab={tab}
                setTab={setTab}
                products={products}
                carts={carts}
                setToken={setToken}
              />
            }
          >
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/calculator"} element={<Calculator />} />
            <Route path={"/animation"} element={<Animation />} />
            <Route path={"/components"} element={<Components />} />
            <Route path={"/todo"} element={<Todo />} />
            <Route
              path={"/products"}
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path={"/carts"}
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
          </Route>

        </Routes>
      </HashRouter>
    </div>
  );
 }
}
export default App;
