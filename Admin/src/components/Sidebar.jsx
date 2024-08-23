const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white p-4 w-[20%] ">
      <nav>
        <ul className="space-y-2 text-left pl-6 pt-6 text-lg font-normal">
          <li>
            <a href="/products" className="text-lg font-bold">
              Products
            </a>
          </li>
          <li>
            <a href="/categories" className="text-lg font-bold">
              Categories
            </a>
          </li>
          <li>
            <a href="/brands" className="text-lg font-bold">
              Brands
            </a>
          </li>
          <li>
            <a href="/users" className="text-lg font-bold">
              Users
            </a>
          </li>
          <li>
            <a href="/inventory" className="text-lg font-bold">
              Inventory
            </a>
          </li>
          <li>
            <a href="/orders" className="text-lg font-bold">
              Orders
            </a>
          </li>
          <li>
            <a href="/mails" className="text-lg font-bold">
              Mails
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
