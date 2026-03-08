import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TopicCard from "@/components/math/TopicCard";
import { topics } from "@/components/math/topicsData";

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  const filtered = topics.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchGrade =
      gradeFilter === "all" || t.grades.includes(gradeFilter);
    return matchSearch && matchGrade;
  });

  const totalFormulas = topics.reduce((sum, t) => sum + t.formulas.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 pt-10 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4"
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium text-purple-200">База знания</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
          >
            Формули и правила
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/80 text-lg mb-6"
          >
            {totalFormulas} формули в {topics.length} теми за 6 и 7 клас
          </motion.p>

          {/* Search and filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Търси тема или формула..."
                className="pl-12 py-6 rounded-xl text-base bg-white/10 border-white/10 text-white placeholder:text-purple-300/50 focus:bg-white/20 focus:border-white/20"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Filter className="w-4 h-4 text-purple-300" />
              {["all", "6", "7"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    gradeFilter === g
                      ? "bg-amber-500 text-black"
                      : "bg-white/10 text-purple-200 hover:bg-white/20"
                  }`}
                >
                  {g === "all" ? "Всички" : `${g} клас`}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Topics grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">Няма намерени теми за &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}