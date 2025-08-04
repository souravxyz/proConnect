import { useForm } from "react-hook-form";
import { useChangePassword } from "../../../hooks/users/useChangePassword";
import { motion } from "framer-motion";
import { FiLock, FiKey } from "react-icons/fi";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const mutation = useChangePassword();

  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <FiKey className="text-indigo-500 text-xl" />
              <h2 className="text-2xl font-medium text-gray-800">
                Change Password
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    {...register("oldPassword", { required: true })}
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-4 py-3 text-gray-700 border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 transition-all"
                  />
                </div>
                {errors.oldPassword && (
                  <span className="block text-xs text-red-500 mt-1">
                    This field is required
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    {...register("newPassword", { required: true })}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 text-gray-700 border-0 border-b border-gray-200 focus:border-indigo-500 focus:ring-0 transition-all"
                  />
                </div>
                {errors.newPassword && (
                  <span className="block text-xs text-red-500 mt-1">
                    This field is required
                  </span>
                )}
              </div>

              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={mutation.isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 tracking-wide"
                >
                  {mutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
