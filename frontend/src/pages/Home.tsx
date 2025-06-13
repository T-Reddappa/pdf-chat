import { motion } from "framer-motion";
import { FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green to-green-200 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Chat with your PDF
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Upload a PDF and get instant answers to your questions using AI.
        Seamless, smart, and secure.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition">
          <FaFileUpload className="text-lg" />
          Get Started
          <button onClick={() => navigate("/chat")} />
        </label>
      </motion.div>
    </div>
  );
};

export default Home;
