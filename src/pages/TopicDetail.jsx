import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTopicById } from "@/components/math/topicsData";
import FormulaCard from "@/components/math/FormulaCard";

export default function TopicDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const topicId = urlParams.get("topic");
  const topic = getTopicById(topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Темата не е намерена</h2>
          <Link to={createPageUrl("KnowledgeBase")}>
            <Button variant="outline">Обратно към формулите</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 pt-8 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to={createPageUrl("KnowledgeBase")}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Обратно към формулите
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${topic.bgColor}`}>
              {topic.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {topic.title}
              </h1>
              <p className="text-purple-200/80 text-lg">{topic.description}</p>
              <div className="flex items-center gap-2 mt-3">
                {topic.grades.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/20"
                  >
                    {g} клас
                  </span>
                ))}
                <span className="text-xs text-purple-300 ml-2">
                  {topic.formulas.length} формули
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6 pb-16">
        {/* Formulas section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Формули и правила</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {topic.formulas.map((formula, i) => (
              <FormulaCard key={i} formula={formula} index={i} />
            ))}
          </div>
        </section>

        {/* Examples section */}
        {topic.examples && topic.examples.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">Примери</h2>
            </div>
            <div className="space-y-4">
              {topic.examples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
                    <h4 className="text-sm font-bold text-purple-800">
                      Задача {i + 1}: {ex.problem}
                    </h4>
                  </div>
                  <div className="px-5 py-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed bg-gray-50 rounded-lg p-4">
                      {ex.solution}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Имаш задача по тази тема?</h3>
          <p className="text-purple-200 mb-5">Нашият AI решител ще ти помогне стъпка по стъпка</p>
          <Link to={createPageUrl("Solver")}>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl shadow-lg shadow-amber-500/25">
              <Sparkles className="w-5 h-5 mr-2" />
              Реши задача с AI
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}