import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center text-white bg-white-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="w-24 h-24 mb-4 text-yellow-400 animate-pulse" />
        <h1 className="text-6xl font-extrabold text-blue-400">404</h1>
        <p className="mt-2 text-xl text-gray-300">Oops! Page Not Found</p>
        <p className="mt-1 text-gray-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <Link
          to="/Dashboard"
          className="inline-block px-6 py-3 mt-6 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          ⬅️ Back to Home
        </Link>
      </motion.div>

      <motion.div
        className="absolute text-sm text-gray-600 bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} SX Shop. All rights reserved.
      </motion.div>
    </div>
  );
};

export default NotFound;
