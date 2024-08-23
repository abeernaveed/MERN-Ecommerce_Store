import { useState, useEffect } from "react";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ handleAuth, handleSet }) => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      handleSet(true);
    } else {
      handleSet(false);
    }
  }, []);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      handleSet(true);
    } catch (error) {
      console.error(error);
      handleSet(false);
    } finally {
      navigate("/");
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md my-12">
      <form className="space-y-4" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Do not have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
