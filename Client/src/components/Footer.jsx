const Footer = () => {
  return (
    <footer className="bg-gray-200 p-12">
      <div className="container mx-auto px-4 ">
        <div className="flex  justify-center items-center">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h5 className="uppercase text-lg font-bold mb-4">About Us</h5>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vitae ante vel eros fermentum faucibus sit amet euismod lorem.
            </p>
          </div>
          <div className="w-full md:w-1/2 pl-24 xl:w-1/3 p-4">
            <h5 className="uppercase text-lg font-bold mb-4">Help</h5>
            <ul>
              <li className="text-sm mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  FAQ
                </a>
              </li>
              <li className="text-sm mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Shipping
                </a>
              </li>
              <li className="text-sm mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h5 className="uppercase text-lg font-bold mb-4">Get in Touch</h5>
            <ul>
              <li className="text-sm mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Contact Us
                </a>
              </li>
              <li className="text-sm mb-2">
                <a href="#" className="text-gray-600 hover:text-gray-800">
                  Social Media
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center md:justify-center py-4">
          <p className="text-sm text-gray-600">
            &copy; 2024 Ecommerce Store. All rights reserved. Designed and
            Developed by{" "}
            <a
              href="https://mabeer-portfolio.netlify.app/"
              className="text-blue-700 font-bold"
            >
              M Abeer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
