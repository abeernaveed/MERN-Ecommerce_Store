import { SiPushbullet } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Hero = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
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
    <div className="flex justify-content items-center flex-row p-12 gap-12">
      <div className="w-1/4">
        <p className="bg-red-500 text-white font-bold  py-2 px-4 ">
          SHOP BY CATEGORIES
        </p>
        <ul>
          {categories?.map((category, index) => {
            return (
              <>
                <div className="" key={index}>
                  <div
                    key={category.id}
                    className="flex justify-content items-center gap-2 pt-3 px-2 bg-gray-200  "
                  >
                    <SiPushbullet />
                    <a href={`/products/${category._id}`}>{category.name}</a>
                  </div>
                </div>
              </>
            );
          })}
        </ul>
      </div>
      <div className="bg-[#ff8fab] w-[70%] relative ">
        <div className=" text-white inline-block pt-12 px-6">
          <p className=" text-white font-bold text-1xl pt-3">Abeer | e-shop</p>
          <h1 className=" text-white text-3xl font-extrabold pt-3">
            Welcome to e-shop
          </h1>
          <p className="text-white text-2xl font-bold pt-3 pb-4">
            Millions of Products
          </p>
          <button
            className="px-4 py-2 bg-red-600 rounded-lg mb-24 "
            onClick={() => navigate("/shop")}
          >
            SHOP NOW
          </button>
        </div>
        <div className="">
          <img
            src="/hero.png"
            className="w-96 absolute top-0 right-0 py-6"
            alt="Hero Section"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
