import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../../api/apiHandler";
import { useEditProfile } from "../../../hooks/users/useEditProfile";
import { FiUser, FiEdit2, FiCamera, FiSave } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getProfile,
  });

  const mutation = useEditProfile(data?.user?._id);
  const profilePic = watch("profilePic");

  useEffect(() => {
    if (data?.user && !isLoading) {
      setValue("name", data.user.name);
      setValue("bio", data.user.bio);
      if (data.user.profilePic) {
        setPreviewImage(data.user.profilePic);
      }
    }
  }, [data, isLoading, setValue]);

  useEffect(() => {
    if (profilePic && profilePic.length > 0) {
      const file = profilePic[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [profilePic]);

  const onSubmit = (formData) => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("bio", formData.bio);
    if (formData.profilePic[0]) {
      payload.append("profilePic", formData.profilePic[0]);
    }
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-gray-100 rounded-full"></div>
          <div className="flex justify-center">
            <div className="h-32 w-32 bg-gray-100 rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
            <div className="h-12 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
            <div className="h-24 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-100 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-6"
    >
      <div className="flex items-center gap-3 mb-10">
        <FiEdit2 className="text-indigo-500 text-xl" />
        <h2 className="text-2xl font-medium text-gray-900">Edit Profile</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:border-indigo-100 transition-all">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <FiUser className="text-gray-300 text-5xl" />
                </div>
              )}
            </div>
            <label
              htmlFor="profilePic"
              className="absolute -bottom-2 right-0 bg-white p-2 rounded-full shadow-sm cursor-pointer border border-gray-100 hover:bg-indigo-50 transition-colors"
            >
              <FiCamera className="text-indigo-500 text-sm" />
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("profilePic")}
              />
            </label>
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Display Name
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            placeholder="Your name"
            className="w-full px-4 py-3 text-gray-700 border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 transition-all"
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            About You
          </label>
          <textarea
            id="bio"
            {...register("bio")}
            placeholder="A short bio about yourself..."
            rows={4}
            className="w-full px-4 py-3 text-gray-700 border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={mutation.isPending}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 tracking-wide"
        >
          {mutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FiSave className="text-lg" />
              Update Profile
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
