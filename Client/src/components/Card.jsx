import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
    }
  }, []);

  const handleAddToCart = (product) => {
    if (id) {
      dispatch(addToCart({ productId: product._id, userId: id }));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm">
      <div className="relative">
        <img
          className="w-full"
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Product Image"
        />
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
          SALE
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price}</span>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
