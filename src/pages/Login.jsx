import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login`, // Make sure your API path is correct
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (res.data && res.data.token) {
        const token = res.data.token;
        console.log("Response Token:", token);
  
        Cookies.set("token", token, { expires: 7, sameSite: "Strict" });
  
        navigate("/dashboard");
      } else {
        alert("Login failed! Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    }
  };
  

  return (
    <div className="flex items-center h-screen w-full bg-gray-50  text-gray-900">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4"> Admin Login</span>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4 md:w-full">
            <label htmlFor="email" className="block text-xs mb-1">
              Username or Email
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Username or Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              className="w-full border rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      
      </div>
    </div>
  );
};

export default Login;