const About = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vitae ante vel eros fermentum faucibus sit amet euismod lorem.
            </p>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="About Us Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <ul>
              <li className="flex mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Team Member 1"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </li>
              <li className="flex mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  alt="Team Member 2"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">Jane Doe</h3>
                  <p className="text-gray-600">Co-Founder & CTO</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vitae ante vel eros fermentum faucibus sit amet euismod lorem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
