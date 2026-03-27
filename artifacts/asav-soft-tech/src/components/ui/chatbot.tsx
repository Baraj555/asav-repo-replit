import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const RESPONSES: Record<string, string> = {
  "course": "We offer 5 premium courses: DevOps Engineer, Data Engineering, Full Stack Developer, Medical Coding, and Soft Skills.",
  "fee": "Fees vary by course. Please check the specific course details page or contact our support team at +91 9535035171.",
  "placement": "We offer 100% placement assistance after successful course completion! Our alumni are placed in top MNCs.",
  "duration": "Course durations range from 2 to 6 months depending on the track. DevOps is 6 months, Full Stack is 4 months.",
  "hello": "Hi there! Welcome to ASAV Soft Tech. How can I help you with your career today?",
  "hi": "Hello! Looking to upgrade your skills? Ask me about our courses, fees, or placements.",
  "default": "I'm still learning! Please contact us directly at asavsofttech@gmail.com or +91 9535035171 for detailed queries."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: "Welcome to ASAV Soft Tech! Ask me about our courses, placements, or duration." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");

    // Simple keyword matching
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = RESPONSES["default"];
      for (const key in RESPONSES) {
        if (lower.includes(key)) {
          reply = RESPONSES[key];
          break;
        }
      }
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 glass-panel rounded-2xl overflow-hidden flex flex-col mb-4"
            style={{ height: '400px' }}
          >
            <div className="bg-card border-b border-white/10 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-semibold font-display text-glow">ASAV Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-card border-t border-white/10 flex gap-2">
              <Input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask something..." 
                className="bg-background border-border focus-visible:ring-primary h-10"
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon" 
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
    </div>
  );
}
