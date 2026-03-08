import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { CheckCircle, Lightbulb, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SolutionDisplay({ solution, problemText }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(solution);
    toast.success("Решението е копирано!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-purple-50/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg">Решение</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Copy className="w-4 h-4 mr-2" />
            Копирай
          </Button>
        </div>

        {/* Problem recap */}
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-start gap-2 bg-amber-50 rounded-lg px-4 py-3 border border-amber-100">
            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Задача</span>
              <p className="text-sm text-amber-900 mt-0.5">{problemText}</p>
            </div>
          </div>
        </div>

        {/* Solution content */}
        <div className="px-6 pb-6 pt-2">
          <div className="prose prose-sm prose-slate max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold text-gray-800 mt-4 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold text-purple-700 mt-3 mb-1">{children}</h3>,
                p: ({ children }) => <p className="text-gray-700 leading-relaxed my-2">{children}</p>,
                strong: ({ children }) => <strong className="text-purple-700 font-semibold">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-mono text-sm">{children}</code>
                ),
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-300 bg-purple-50 pl-4 py-2 my-3 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {solution}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}