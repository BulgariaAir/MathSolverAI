import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function TopicCard({ topic, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link
        to={createPageUrl("TopicDetail") + `?topic=${topic.id}`}
        className="block group"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-500 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${topic.bgColor}`}>
            {topic.icon}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
            {topic.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {topic.description}
          </p>

          <div className="mt-4 flex items-center gap-2">
            {topic.grades.map(g => (
              <span key={g} className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                {g} клас
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}