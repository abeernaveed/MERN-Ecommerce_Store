import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getCartById } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../features/checkoutSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cartData, setCartData] = useState([]);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        dispatch(getCartById(decoded.id));
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/login");
    }
  }, [dispatch]);
  useEffect(() => {
    setCartData(data.cart.cartItems);
  }, [data.cart.cartItems]);

  // const cartData = data.cart.cartItems;
  const subtotal = cartData?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    if ((shippingAddress === "") | (name === "") | (email === "")) {
      alert("Please fill all fields");
    }
    e.preventDefault();
    dispatch(createOrder({ userId, shippingAddress }));
    setName("");
    setEmail("");
    setCartData([]);
    setShippingAddress("");
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-12 shadow-lg my-8 rounded-xl">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col mb-4">
        <span className="text-lg font-bold">Order Summary:</span>
        <ul>
          {cartData?.map((item, index) => (
            <li key={index} className="flex justify-between mb-2">
              <span>{item._id}</span>
              <span>
                {item.quantity} x {item.price}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mb-4">
          <span className="text-xl font-bold">Subtotal:</span>
          <span className="text-xl font-bold">{subtotal}</span>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <span className="text-lg font-bold">Shipping Address:</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-2 mb-2"
          />
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
