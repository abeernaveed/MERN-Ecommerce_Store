const Boxes = () => {
  return (
    <div className="flex  justify-center gap-6 ">
      <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 xl:w-1/4">
        <h3 className="text-lg font-bold">Products</h3>
        <p className="text-gray-600">123</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 xl:w-1/4">
        <h3 className="text-lg font-bold">Orders</h3>
        <p className="text-gray-600">456</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 xl:w-1/4">
        <h3 className="text-lg font-bold">Users</h3>
        <p className="text-gray-600">789</p>
      </div>
      <div className="bg-white p-4 rounded shadow-md w-full md:w-1/2 xl:w-1/4">
        <h3 className="text-lg font-bold">Revenue</h3>
        <p className="text-gray-600">$1234</p>
      </div>
    </div>
  );
};

export default Boxes;
