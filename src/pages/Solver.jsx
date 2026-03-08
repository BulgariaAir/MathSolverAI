import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, History, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SolutionDisplay from "@/components/math/SolutionDisplay";

const TOPIC_LABELS = {
  equations: "Уравнения",
  fractions: "Дроби",
  proportions: "Пропорции",
  percentages: "Проценти",
  powers: "Степени",
  ratios: "Отношения",
  geometry: "Геометрия",
  word_problems: "Текстови задачи",
};

export default function Solver() {
  const [problem, setProblem] = useState("");
  const [grade, setGrade] = useState("6");
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const queryClient = useQueryClient();

  const { data: history = [] } = useQuery({
    queryKey: ["solved-problems"],
    queryFn: () => base44.entities.SolvedProblem.list("-created_date", 20),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.SolvedProblem.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["solved-problems"] }),
  });

  const solveProblem = async () => {
    if (!problem.trim()) return;
    setIsLoading(true);
    setSolution(null);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Ти си експерт по математика за българската учебна програма за ${grade} клас.
Ти си "Златният Мозък" - най-умният математически помощник.

Реши следната математическа задача стъпка по стъпка на БЪЛГАРСКИ език.

Задача: ${problem}

Инструкции:
1. Първо определи типа на задачата (уравнение, дроби, проценти, геометрия, текстова задача и т.н.)
2. Посочи кои формули и правила ще използваш
3. Реши задачата стъпка по стъпка - всяка стъпка на нов ред
4. Обясни ВСЯКА стъпка ясно и разбираемо за ученик от ${grade} клас
5. Ако е геометрична задача, опиши фигурата и нейните елементи
6. Дай крайния отговор ясно оформен
7. Накрая дай кратък съвет или трик за подобни задачи

Форматирай отговора с Markdown:
- Използвай ### за заглавия на секции
- Използвай **bold** за важни неща и формули
- Използвай \`code\` за числа и изрази
- Използвай > за важни бележки
- Пиши на БЪЛГАРСКИ.`,
      response_json_schema: {
        type: "object",
        properties: {
          topic: { type: "string", enum: ["equations", "fractions", "proportions", "percentages", "powers", "ratios", "geometry", "word_problems"] },
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
      topic: result.topic,
      grade: grade,
    });
    queryClient.invalidateQueries({ queryKey: ["solved-problems"] });
  };

  const loadFromHistory = (item) => {
    setProblem(item.problem_text);
    setSolution({ solution_markdown: item.solution, topic: item.topic });
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 pt-10 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Златен Мозък</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
          >
            AI Математически Решител
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/80 text-lg"
          >
            Напиши задача и получи подробно решение стъпка по стъпка
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8">
        {/* Solver card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-purple-50/50 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="w-32 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 клас</SelectItem>
                  <SelectItem value="7">7 клас</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="rounded-xl"
            >
              <History className="w-4 h-4 mr-2" />
              История
            </Button>
          </div>

          {/* History panel */}
          {showHistory && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 border border-gray-100 rounded-xl overflow-hidden"
            >
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-700">Последни задачи</span>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-purple-50/50 transition-colors cursor-pointer group"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.problem_text}</p>
                      <span className="text-xs text-gray-400">
                        {item.topic && TOPIC_LABELS[item.topic]}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMutation.mutate(item.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <Textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Напиши математическа задача тук...&#10;&#10;Примери:&#10;• Реши уравнението: 5x - 3 = 2x + 9&#10;• Намерете лицето на триъгълник с основа 8 и височина 5&#10;• Колко е 35% от 240?"
            className="min-h-[140px] text-base border-gray-200 rounded-xl focus:ring-purple-500 focus:border-purple-500 resize-none mb-5"
          />

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
        </motion.div>

        {/* Solution */}
        {solution && (
          <div className="mt-6 pb-16">
            <SolutionDisplay
              solution={solution.solution_markdown}
              problemText={problem}
            />
          </div>
        )}

        {/* Tips section when no solution */}
        {!solution && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 pb-16"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "🔢", title: "Уравнения", hint: "Напиши уравнението с x, напр.: 3x + 5 = 20" },
                { icon: "📐", title: "Геометрия", hint: "Опиши фигурата и дадените стойности" },
                { icon: "%", title: "Проценти", hint: "Напиши какъв процент от кое число търсиш" },
                { icon: "📝", title: "Текстови задачи", hint: "Копирай цялата задача от учебника" },
              ].map((tip) => (
                <div key={tip.title} className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{tip.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{tip.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}