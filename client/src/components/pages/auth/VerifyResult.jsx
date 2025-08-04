// components/pages/auth/VerifyResult.jsx
import { useSearchParams, Link } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

const messages = {
  success: {
    icon: <FiCheckCircle className="text-green-500 w-8 h-8" />,
    title: "Email Verified!",
    text: "Your email has been successfully verified.",
  },
  already: {
    icon: <FiAlertCircle className="text-yellow-500 w-8 h-8" />,
    title: "Already Verified",
    text: "Your email has already been verified.",
  },
  failed: {
    icon: <FiXCircle className="text-red-500 w-8 h-8" />,
    title: "Verification Failed",
    text: "The verification link is invalid or expired.",
  },
  notfound: {
    icon: <FiXCircle className="text-red-500 w-8 h-8" />,
    title: "User Not Found",
    text: "No user found for this verification link.",
  },
};

export default function VerifyResult() {
  const [params] = useSearchParams();
  const status = params.get("status") || "failed";

  const { icon, title, text } = messages[status] || messages.failed;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{text}</p>
        <Link
          to="/login"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
