import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddEmail = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const token = Cookies.get("admintoken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/add-email`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Email added:", response.data);
      alert("Email added successfully!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding email:", error);
      alert("Failed to add email. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add Email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input className="border p-2 w-full" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit" className="bg-black text-white px-4 py-2 w-full rounded-md hover:bg-gray-800 transition">ADD</button>
      </form>
    </div>
  );
};

export default AddEmail;