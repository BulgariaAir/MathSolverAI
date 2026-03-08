import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import SolutionDisplay from "./SolutionDisplay";

export default function QuickSolver() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const solveProblem = async () => {
    if (!problem.trim()) return;
    setIsLoading(true);
    setSolution(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Ти си експерт по математика за българската учебна програма за 6 и 7 клас.

Реши следната математическа задача стъпка по стъпка на БЪЛГАРСКИ език.

Задача: ${problem}

Инструкции:
1. Първо определи типа на задачата (уравнение, дроби, проценти, геометрия, текстова задача и т.н.)
2. Избери правилната формула или метод
3. Реши задачата стъпка по стъпка
4. Обясни всяка стъпка ясно и разбираемо за ученик
5. Дай крайния отговор
6. Ако е геометрична задача, опиши фигурата

Форматирай отговора с Markdown, използвай **bold** за важни неща, \`code\` за формули.
Бъди подробен но ясен. Пиши на БЪЛГАРСКИ.`,
      response_json_schema: {
        type: "object",
        properties: {
          topic: { type: "string", description: "The math topic (equations, fractions, proportions, percentages, powers, ratios, geometry, word_problems)" },
          solution_markdown: { type: "string", description: "Full step-by-step solution in Bulgarian, formatted with Markdown" },
          final_answer: { type: "string", description: "The final answer in Bulgarian" }
        }
      }
    });

    setSolution(result);
    setIsLoading(false);

    await base44.entities.SolvedProblem.create({
      problem_text: problem,
      solution: result.solution_markdown,
      topic: result.topic
    });
  };

  const exampleProblems = [
    "Реши уравнението: 3x + 7 = 22",
    "Намерете 30% от 250",
    "Лицето на кръг с радиус 6 см",
    "2/3 + 3/4 = ?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-purple-50/50 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Решител</h2>
          <p className="text-sm text-gray-500">Напиши задача и получи решение стъпка по стъпка</p>
        </div>
      </div>

      <Textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Напиши математическа задача тук... Например: Реши уравнението 2x + 5 = 15"
        className="min-h-[120px] text-base border-gray-200 rounded-xl focus:ring-purple-500 focus:border-purple-500 resize-none mb-4"
      />

      {/* Example problems */}
      <div className="flex flex-wrap gap-2 mb-5">
        {exampleProblems.map((ex) => (
          <button
            key={ex}
            onClick={() => setProblem(ex)}
            className="text-xs px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-100"
          >
            {ex}
          </button>
        ))}
      </div>

      <Button
        onClick={solveProblem}
        disabled={!problem.trim() || isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-purple-200/50 transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Решавам задачата...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Реши задачата
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>

      {solution && (
        <SolutionDisplay
          solution={solution.solution_markdown}
          problemText={problem}
        />
      )}
    </motion.div>
  );
}