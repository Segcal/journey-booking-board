import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "emailjs-com";

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
    emergencyAddress: "",
  });

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userDetails");
    if (saved) {
      setFormData(JSON.parse(saved));
      setIsRegistered(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = () => {
    const serviceId = "service_2w5vppi";
    const templateId = "template_kv740sl";
    const userId = "jKnkKJd6XFJ1YRhG7"; 

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(() => toast.success("Profile details sent via email!"))
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast.error("Email sending failed. See console for details.");
      });
  };

  const handleSave = () => {
    localStorage.setItem("userDetails", JSON.stringify(formData));
    sendEmail();
    navigate("/");
  };

  const handleUpdate = () => {
    localStorage.setItem("userDetails", JSON.stringify(formData));
    sendEmail();
    toast("Profile updated and email sent!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label className="block capitalize mb-1">
            {key.replace(/([A-Z])/g, " $1")}:
          </label>
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
          disabled={isRegistered}
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
      {isRegistered && (
        <p className="mt-4 text-sm text-gray-600 italic">
          You are already registered. You can only update your profile.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
