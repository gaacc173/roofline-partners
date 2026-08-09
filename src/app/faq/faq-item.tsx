"use client";

import { useState } from "react";

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md bg-white py-4 text-left text-base font-medium text-slate-950 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 dark:hover:text-slate-200"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${question.replace(/\W+/g, "-").toLowerCase()}`}
      >
        <span>{question}</span>
        <span className="ml-4 shrink-0 text-zinc-400" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p
          id={`faq-answer-${question.replace(/\W+/g, "-").toLowerCase()}`}
          className="pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {answer}
        </p>
      )}
    </div>
  );
}
