const CatSection = ({ title, image }) => {
  return (
    <div>
      <div className="relative">
        <h2 className="absolute top-16 left-12  text-white font-bold text-2xl">
          {title}
        </h2>
        <a
          href="/shop"
          className="absolute left-12 top-24 text-blue-950 underline"
        >
          View all
        </a>
        <img src={image} alt="" className="w-full rounded-xl " />
      </div>
    </div>
  );
};

export default CatSection;
