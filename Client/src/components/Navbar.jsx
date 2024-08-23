import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCartById } from "../features/cartSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ handleAuth, handleSet }) => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const cartData = useSelector((state) => state.cart);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
      dispatch(getCartById(decoded.id));
      handleSet(true);
    } else {
      handleSet(false);
    }
  }, [dispatch, cartData]);

  useEffect(() => {
    setCart(cartData.cart.cartItems);
    setCount(cartData.cart.count);
  }, [cartData.cart.count, cartData.cart.cartItems]);

  const handleLogout = async () => {
    await dispatch(logout());
    Cookies.remove("token");
    handleSet(false);
  };

  return (
    <div className="shadow-md">
      <nav className="flex justify-between items-center py-5 px-24 ">
        <div className="Logo">
          <img className="w-20" src="/logo.png" alt="Logo" />
        </div>
        <div className="relative">
          <div className="">
            <section className="flex justify-center items-center pt-4 gap-12 font-bold pb-4 text-xl text-red-800">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About us</Link>
              <Link to="/contact">Contact us</Link>
            </section>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="relative pr-4">
            <Link to={id ? "/cart" : "/login"}>
              <FaCartArrowDown className=" text-2xl text-black cursor-pointer" />
              <span className="absolute bottom-3 left-6 font-normal ">
                {count}
              </span>
            </Link>
          </div>
          {handleAuth ? (
            <div className="">
              <Link onClick={handleLogout}>Log out</Link>
            </div>
          ) : (
            <div className="flex justify-center item-center">
              <div className="">
                <a href="/login">Login</a> |
              </div>
              <div className="">
                <a href="/signup">Sign Up</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
