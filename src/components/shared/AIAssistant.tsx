'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store';
import { dishes } from '@/data/dishes';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  dishes?: typeof dishes;
}

const mockResponses: Record<string, { text: string; filter: (d: typeof dishes[0]) => boolean }> = {
  spicy: { text: "Here are our boldest dishes 🔥", filter: (d) => d.spiceLevel >= 3 },
  vegetarian: { text: "Our best vegetarian picks:", filter: (d) => d.isVeg },
  veg: { text: "Our best vegetarian picks:", filter: (d) => d.isVeg },
  himachali: { text: "Authentic Himachali specialties from the mountains:", filter: (d) => d.isLocalSpecialty },
  local: { text: "Our local Himachali specialties:", filter: (d) => d.isLocalSpecialty },
  healthy: { text: "Lighter, nutritious options:", filter: (d) => d.nutrition.calories <= 350 },
  protein: { text: "High-protein dishes:", filter: (d) => d.nutrition.protein >= 20 },
  sweet: { text: "Our desserts:", filter: (d) => d.category === 'desserts' },
  dessert: { text: "Our desserts:", filter: (d) => d.category === 'desserts' },
  drink: { text: "Our beverages:", filter: (d) => d.category === 'drinks' },
  popular: { text: "Customer favorites:", filter: (d) => d.isBestseller },
  recommend: { text: "Chef's recommendations:", filter: (d) => d.isChefRecommended },
};

function getResponse(input: string): Message {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (lower.includes(keyword)) {
      const matched = dishes.filter(response.filter).slice(0, 3);
      return { role: 'assistant', content: response.text, dishes: matched };
    }
  }
  return {
    role: 'assistant',
    content: "Try asking about: spicy dishes, vegetarian options, Himachali specialties, healthy choices, or our popular items.",
  };
}

export function AIAssistant() {
  const { aiChatOpen, setAiChatOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I can help you find the perfect dish. What are you in the mood for?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    const response = getResponse(input);
    setMessages((prev) => [...prev, userMsg, response]);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:w-[340px] z-50 max-h-[480px] bg-white rounded-2xl shadow-2xl ring-1 ring-stone-200 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-stone-900 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Food Guide</p>
                  <p className="text-[10px] text-stone-400">AI-powered recommendations</p>
                </div>
              </div>
              <button onClick={() => setAiChatOpen(false)} className="h-7 w-7 rounded-lg hover:bg-stone-100 flex items-center justify-center transition-colors">
                <X className="h-4 w-4 text-stone-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-br-sm'
                      : 'bg-stone-100 text-stone-700 rounded-bl-sm'
                  }`}>
                    <p>{msg.content}</p>
                    {msg.dishes && msg.dishes.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.dishes.map((d) => (
                          <Link key={d.id} href={`/dish/${d.id}`} onClick={() => setAiChatOpen(false)} className="block bg-white rounded-lg p-2.5 ring-1 ring-stone-100 hover:ring-stone-200 transition-colors">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-stone-900 text-xs">{d.name}</span>
                              <span className="text-xs font-bold text-stone-600">₹{d.price}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-stone-100">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="e.g. something spicy..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 placeholder:text-stone-400"
                />
                <button
                  onClick={handleSend}
                  className="h-10 w-10 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAiChatOpen(!aiChatOpen)}
        className="fixed bottom-6 right-4 z-50 h-12 px-4 rounded-full bg-stone-900 text-white shadow-xl flex items-center gap-2 ring-1 ring-stone-800"
      >
        <Sparkles className="h-4 w-4 text-amber-400" />
        <span className="text-sm font-medium">{aiChatOpen ? 'Close' : 'Ask AI'}</span>
      </motion.button>
    </>
  );
}
