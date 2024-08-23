const Info = ({ icon, title, description }) => {
  return (
    <div className="info  pt-12 px-4  shadow-2xl inline-block rounded-lg ">
      {icon}
      <h1 className="pt-3 text-center font-bold">{title}</h1>
      <p className="pt-3 pb-6 text-center">{description}</p>
    </div>
  );
};

export default Info;
