import { useEffect } from "react";
import { fetchProducts } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import { ClipLoader } from "react-spinners";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center relative">
        <ClipLoader className="w-64 h-64 top-16 absolute" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <h1 className="text-center text-3xl text-red-600 font-extrabold pt-8">
        Products
      </h1>

      <ul>
        <div className="flex justify-center items-center gap-6 p-12 ">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Products;
