import { useState } from "react";
import { motion } from "framer-motion";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h && w) {
      const bmiValue = (w / (h * h)).toFixed(1);
      setBmi(bmiValue);
      if (bmiValue < 18.5) setStatus("Underweight");
      else if (bmiValue < 24.9) setStatus("Normal");
      else if (bmiValue < 29.9) setStatus("Overweight");
      else setStatus("Obese");
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Underweight":
        return "text-yellow-500";
      case "Normal":
        return "text-green-500";
      case "Overweight":
        return "text-orange-500";
      case "Obese":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-pink-200 to-blue-300 max-w-md w-full p-8 space-y-6 shadow-2xl rounded-3xl border border-gray-200"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">BMI Calculator</h1>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-gradient-to-r from-white to-blue-200 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-gradient-to-r from-white to-blue-200 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={calculateBMI}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-200 hover:scale-102"
          >
            Calculate BMI
          </button>
        </div>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-white to-blue-200 mt-4 p-4 rounded-lg border border-purple-300 text-center"
          >
            <p className="text-lg font-medium text-gray-700">
              Your BMI: <strong className="text-blue-600">{bmi}</strong>
            </p>
            <p className={`text-lg font-medium ${getStatusColor()}`}>
              Status: <strong>{status}</strong>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default BMICalculator;
