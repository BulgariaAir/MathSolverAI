import React from "react";
import { motion } from "framer-motion";

export default function FormulaCard({ formula, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-purple-50 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{formula.name}</h4>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg px-4 py-3 mb-3 border border-purple-100/50">
            <code className="text-lg font-mono font-bold text-purple-800 tracking-wide">
              {formula.formula}
            </code>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{formula.explanation}</p>
        </div>
      </div>
    </motion.div>
  );
}