import InfoData from "../assets/infoData";
import Category from "../assets/Category";
import Products from "../components/Product";
import Info from "../components/Info";
import CatSection from "../components/CatSection";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex justify-center items-center gap-3 mb-24 px-12">
        {InfoData?.map((data, index) => (
          <Info
            key={index}
            title={data.title}
            icon={data.icon}
            description={data.description}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-10 p-12  ">
        {Category?.map((data, index) => (
          <CatSection key={index} title={data.title} image={data.image} />
        ))}
      </div>
      <Products />
    </>
  );
};

export default Home;
