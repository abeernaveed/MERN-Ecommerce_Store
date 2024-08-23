import { useDispatch } from "react-redux";
import { useState } from "react";
import { saveMessage } from "../features/messageSlice";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveMessage({ name, email, message }));
    setname("");
    setemail("");
    setmessage("");
  };
  return (
    <section className="bg-white py-20 p-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 px-4">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-8 px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
          ante vel eros fermentum faucibus sit amet euismod lorem.
        </p>
        <div className="flex justify-center items-center flex-col">
          <div className="w-full xl:w-7/10 px-4 mb-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 xl:w-1/2 px-4 mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    required
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    id="name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="w-full md:w-1/2 xl:w-1/2 px-4 mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    id="email"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full  mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  rows="6"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="w-full xl:w-3/10 px-4 mb-4">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-4">
              M Abeer, A full Stack Javascript Developer and a Computer Science
              Student.
            </p>
            <ul>
              <li className="mb-4">
                <i className="fas fa-phone mr-2"></i>
                <span>0306-2665929</span>
              </li>
              <li className="mb-4">
                <i className="fas fa-envelope mr-2"></i>
                <span>abeernaveed33@gmail.com</span>
              </li>
              <li className="mb-4">
                <i className="fas fa-map-marker mr-2"></i>
                <span>123 Main St, Anytown, USA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
