import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    telNo: "",
    address: "",
    gender: "",
    nationality: "",
    age: "",
    bloodGroup: "",
    genotype: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    nextOfKinAddress: "",
    emergencyContact: "",
    emergencyAddress: ""
  });

  // Load saved profile data into the form on mount
  useEffect(() => {
    const saved = localStorage.getItem("userDetails");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSave = () => {
    localStorage.setItem("userDetails", JSON.stringify(formData));
    navigate("/");
  };

  const handleUpdate = () => {
    localStorage.setItem("userDetails", JSON.stringify(formData));
    toast("Profile updated!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label className="block capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}:</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
