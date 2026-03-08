import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/math/HeroSection";
import TopicCard from "@/components/math/TopicCard";
import QuickSolver from "@/components/math/QuickSolver";
import { topics } from "@/components/math/topicsData";
import { BookOpen, Sparkles, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Topics Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-50 rounded-full px-4 py-1.5 mb-4"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Учебна програма</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Теми по математика
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            Всички формули и правила за 6 и 7 клас, организирани по теми
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </section>

      {/* Quick Solver Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-4 py-1.5 mb-4"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">AI Powered</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
            >
              Реши задача сега
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-xl mx-auto"
            >
              Напиши задачата си и нашият AI ще я реши стъпка по стъпка
            </motion.p>
          </div>

          <QuickSolver />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Как работи?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: "✏️",
              title: "Напиши задачата",
              desc: "Въведи математическата задача в полето за текст — уравнение, дроби, геометрия или текстова задача."
            },
            {
              step: "02",
              icon: "🧠",
              title: "AI анализира",
              desc: "Нашият AI разпознава типа задача, избира правилните формули и изчислява решението."
            },
            {
              step: "03",
              icon: "✅",
              title: "Получи решение",
              desc: "Получаваш подробно решение стъпка по стъпка с обяснения на български език."
            }
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-xl hover:shadow-purple-50 transition-all duration-500"
            >
              <div className="absolute -top-3 left-6 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {item.step}
              </div>
              <div className="text-4xl mb-4 mt-2">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white">МатМайстор</span>
          </div>
          <p className="text-sm text-center">Математически помощник за 6 и 7 клас по българската учебна програма</p>
        </div>
      </footer>
    </div>
  );
}