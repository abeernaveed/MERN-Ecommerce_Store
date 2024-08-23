import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getCartById, removeFromCart } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const data = cart.cart.cartItems;
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      dispatch(getCartById(decoded.id));
    } else {
      // navigate("/login");
    }
  }, [dispatch]);

  const handleDelete = (userId, productId) => {
    dispatch(removeFromCart({ userId, productId }));
  };

  const subtotal = data?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-md rounded-lg my-12">
      <h1 className="text-4xl font-bold mb-4">Cart</h1>
      <ul className="flex flex-col gap-4">
        {data?.map((item) => (
          <li key={item.id} className="flex gap-4">
            <img
              src={item.image}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold">{item.quantity}</span>
              <span className="text-md">
                {item.quantity} x {item.price}
              </span>
              <button
                onClick={() => handleDelete(userId, item.productId)}
                // href={`/carts/${userId}/${item.productId}`}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mb-4">
        <span className="text-lg font-bold">Subtotal:</span>
        <span className="text-lg">{subtotal}</span>
      </div>
      <a
        href="/checkout"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-full"
      >
        Checkout
      </a>
    </div>
  );
};

export default Cart;
