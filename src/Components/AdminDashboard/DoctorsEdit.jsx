import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllCategoriesQuery,
  useUpdateDoctorMutation,
  useGetDoctorsByIdQuery,
} from "../../Feature/ApiSlice";
import { toast } from "react-toastify";
import uploadToCloudinary from "../../Utils/Cloudinary";

const DoctorsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { data: doctor } = useGetDoctorsByIdQuery(id);
  
  const [update, { isLoading: isUpdating }] = useUpdateDoctorMutation();

  const [slotDay, setSlotDay] = useState("");
  const [slotTime, setSlotTime] = useState("");

  const [details, setDetails] = useState({
    name: "",
    experience: "",
    fees: "",
    degree: "",
    about: "",
    Slots: [],
  });

  useEffect(() => {
    if (doctor) {
      setDetails(doctor);
    }
  }, [doctor]);

  const changeCategory = (e) => {
    const { value } = e.target;
    setDetails((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const ImageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("please upload a files");
    }
    try {
      toast.success("image uploading...");
      const result = await uploadToCloudinary(file);
      if (!result) {
        return toast.error("result not found!");
      }
      setDetails((prev) => ({
        ...prev,
        image: result.url,
      }));
      toast.success("image upload success!");
    } catch (error) {
      toast.error("image upload failed");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setIsActive = (e) => {
    const active = e.target.value === "true";
    setDetails((prev) => ({
      ...prev,
      isActive: active,
    }));
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!slotDay || !slotTime) {
      return toast.error("please fillup both data!");
    }
    const newSlot = {
      day: slotDay,
      isBooked: false,
      time: slotTime,
    };
    setDetails((prev) => ({
      ...prev,
      Slots: [...prev.Slots, newSlot],
    }));
    setSlotDay("");
    setSlotTime("");
  };

  const removeItem = (index) => {
    setDetails((prev) => ({
      ...prev,
      Slots: prev.Slots.filter((_, i) => index !== i),
    }));
  };

  const submitDoctor = async (e) => {
    e.preventDefault();
    try {
      const result = await update({ id: id, data: details }).unwrap(); 
      if (result?.success || result) {
        toast.success("Update success!");
        navigate("/admin-dashboard/DoctorManagement");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update doctor");
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-100">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Doctors</h2>
            <p className="text-sm text-gray-500">Edit a doctor details</p>
          </div>
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all text-sm shadow-sm"
            onClick={() => navigate("/admin-dashboard/DoctorManagement")}
          >
            &larr; See Doctors List
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
                value={details.name || ""}
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
              <select
                name="categoryId"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
                onChange={changeCategory}
                value={details.categoryId || ""}
              >
                <option value="">--select---</option>
                {allCategories?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
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
                value={details.experience || ""}
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
                value={details.fees || ""}
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
                value={details.degree || ""}
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
                value={details.about || ""}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all resize-none"
                placeholder="Write something about doctor's expertise..."
                onChange={changeHandler}
              />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Select Availability
              </label>
              <select
                name="isActive"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff] outline-none transition-all"
                value={String(details.isActive)}
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
            {details?.Slots?.length > 0 && (
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
                        {slot.day} &bull; {slot.time}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50 transition-all"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full md:w-auto bg-[#5f6fff] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                isUpdating ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? (
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
                "Update Doctor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorsEdit;