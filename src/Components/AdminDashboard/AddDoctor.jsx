import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadToCloudinary from "../../Utils/Cloudinary";
import {
  useAddDoctorMutation,
  useGetAllCategoriesQuery,
} from "../../Feature/ApiSlice";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/Firebase";
import { sentDoctorSignEmail } from "../../Utils/SentDoctorSignEmail";

const AddDoctor = () => {
  const navigate = useNavigate();
  const [addDoctor] = useAddDoctorMutation();
  const { data: allCategories } = useGetAllCategoriesQuery();

  const [slotDay, setSlotDay] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorsDetails, setDoctorsDetails] = useState({
    email: "",
    password: "",
  });

  const [details, setDetails] = useState({
    name: "",
    experience: "",
    fees: "",
    degree: "",
    isActive: true,
    about: "",
    Slots: [],
    image: "",
  });
 const changeCategory = (e) => {
  const { value } = e.target;
  
  setDetails((prev) => ({
    ...prev,
    categoryId: value
  }));
};
   
  const setIsActive = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      isActive: value === "true",
    }));
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cloudinary Image Upload
  const ImageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading image...");
    try {
      const result = await uploadToCloudinary(file);
      setDetails((prev) => ({ ...prev, image: result.url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  // Add Slot to Object Array
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!slotDay || !slotTime) {
      toast.error("Please enter both day and time");
      return;
    }

    const newSlot = {
      day: slotDay.trim(),
      time: slotTime.trim(),
      isBooked: false,
    };

    setDetails((prev) => ({
      ...prev,
      Slots: [...prev.Slots, newSlot],
    }));

    setSlotTime("");
  };

  // Remove specific slot
  const removeItem = (indexToRemove) => {
    setDetails((prev) => ({
      ...prev,
      Slots: prev.Slots.filter((_, i) => i !== indexToRemove),
    }));
  };

  // Doctors login identity handler
  const changeDoctorHandler = (e) => {
    const { name, value } = e.target;
    setDoctorsDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Doctor Data
  const submitDoctor = async (e) => {
    e.preventDefault();
    if (
      !details.name ||
      !details.categoryId ||
      !details.fees ||
      !details.image
    ) {
      toast.error(
        "Please fill in all required fields (Name, Speciality, Fees, Image)",
      );
      return;
    }
    if (!doctorsDetails.email || !doctorsDetails.password) {
      toast.error("Email and Password are required for authentication");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        doctorsDetails.email,
        doctorsDetails.password,
      );

      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, {
        email: doctorsDetails.email,
        role: "doctor",
        isActive: true,
        createdAt: new Date(),
      });

      const finalDoctorData = {
        ...details,
        uid: userId,
      };

      await addDoctor(finalDoctorData).unwrap();
      toast.success("Doctor added successfully!");
      await sentDoctorSignEmail({
        email: doctorsDetails.email,
        password: doctorsDetails.password,
      });
      toast.success("doctors Added Success! Doctor email sent success!");
      // Reset States
      setDetails({
        name: "",
        speciality: "",
        experience: "",
        fees: "",
        degree: "",
        about: "",
        Slots: [],
        image: "",
      });
      setDoctorsDetails({ email: "", password: "" });

      navigate("/admin-dashboard/DoctorManagement");
    } catch (error) {
      console.error("Submission Error: ", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered!");
      } else {
        toast.error(error.message || "Failed to add doctor");
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(details)

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-100">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
          <p className="text-sm text-gray-500">
            Register a new doctor into the system dashboard
          </p>
        </div>
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all text-sm shadow-sm"
          onClick={() => navigate("/admin-dashboard/DoctorManagement")}
        >
          ← See Doctors List
        </button>
      </div>

      <form onSubmit={submitDoctor} className="space-y-6">
        {/* Image Upload and Profile Preview */}
        <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="relative">
            {details.image ? (
              <img
                src={details.image}
                alt="Doctor Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#5f6fff]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-400 font-medium text-center px-2">
                No Image Selected
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Doctor's Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#5f6fff] hover:file:bg-blue-100 cursor-pointer"
              onChange={ImageHandler}
            />
          </div>
        </div>

        {/* Grid Inputs - Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Doctor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
              placeholder="Dr. John Doe"
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Speciality <span className="text-red-500">*</span>
            </label>
            <select name="categoryId" id=""  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all" onChange={changeCategory}>
              <option>--select---</option>
              {allCategories?.map((category)=>(
                
              
               
                <option value={category.id} key={category.id}>{category.name}</option>
               
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={details.experience}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
              placeholder="e.g. 5 Years"
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Consultation Fees <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="fees"
              value={details.fees}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
              placeholder="e.g. 500"
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Education Degree
            </label>
            <input
              type="text"
              name="degree"
              value={details.degree}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
              placeholder="MBBS, MD, FCPS"
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              About / Biography
            </label>
            <textarea
              rows="3"
              name="about"
              value={details.about}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all resize-none"
              placeholder="Write something about doctor's expertise..."
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Select Avaiblity
            </label>
            <select
              name="isActive"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
              value={details.isActive}
              onChange={setIsActive}
            >
             
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
        </div>

        {/* Availability Slots Manager Block */}
        <div className="border border-gray-200 p-5 rounded-xl bg-slate-50 space-y-4">
          <h3 className="text-base font-bold text-gray-800">
            Setup Availability Slots
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Day Schedule
              </label>
              <input
                type="text"
                placeholder="e.g., SUN 16"
                value={slotDay}
                onChange={(e) => setSlotDay(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Time Slot
              </label>
              <input
                type="text"
                placeholder="e.g., 08:00 am"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm outline-none focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff]"
              />
            </div>

            <button
              type="button"
              onClick={handleAddSlot}
              className="w-full bg-[#5f6fff] hover:bg-blue-700 text-white font-medium p-2.5 rounded-lg text-sm transition-all shadow-sm h-[42px]"
            >
              + Add Slot
            </button>
          </div>

          {/* Live Badge Previews */}
          {details.Slots.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs font-bold text-gray-500 mb-2">
                Live Slots Preview ({details.Slots.length})
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {details.Slots.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-[#5f6fff] text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-2 shadow-xs"
                  >
                    <span>
                      {slot.day} • {slot.time}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50 transition-all"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Doctor Login Credentials Block */}
        <div className="border border-gray-200 p-5 rounded-xl bg-indigo-50/50 space-y-4">
          <div className="border-b border-indigo-100 pb-2">
            <h3 className="text-base font-bold text-indigo-900">
              Doctor Login Credentials
            </h3>
            <p className="text-xs text-indigo-600">
              These credentials will be used by the doctor to securely log into
              their profile panel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Doctor Login Email{" "}
                <span className="text-red-500">
                  *(User password deliveried with email)
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={doctorsDetails.email}
                required
                placeholder="doctor@example.com"
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
                onChange={changeDoctorHandler}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Temporary Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={doctorsDetails.password}
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
                onChange={changeDoctorHandler}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto bg-[#5f6fff] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Save & Add Doctor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
