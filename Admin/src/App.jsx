import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import User from "./pages/users/User";
import Category from "./pages/categories/Category";
import Brand from "./pages/brands/Brand";
import Products from "./pages/products/Products";
import Inventory from "./pages/inventory/Inventory";
import Orders from "./pages/orders/Orders";
import Mails from "./pages/mails/Mails";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      <div>
        <Header />
        <div className="flex ">
          <Sidebar />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/users" element={<User />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/mails" element={<Mails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
