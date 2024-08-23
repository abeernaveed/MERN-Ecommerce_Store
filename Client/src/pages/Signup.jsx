import { useState, useEffect } from "react";
import { signup } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = ({ handleAuth, handleSet }) => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      handleSet(true);
    } else {
      handleSet(false);
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { user, error } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    try {
      await dispatch(
        signup({ firstName, lastName, email, password, passwordConfirm })
      );
      handleSet(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      handleSet(false);
      // Display error message here
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md my-12">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName" className="text-sm">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
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
        <div className="flex flex-col space-y-2">
          <label htmlFor="passwordConfirm" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Sign Up
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
