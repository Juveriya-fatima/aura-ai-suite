import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, User, Mic, MicOff, Send, Clock, 
  Play, Building2, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";
import { TypingIndicator } from "@/components/TypingIndicator";
import { AudioWaveform } from "@/components/AudioWaveform";

const difficulties = [
  { id: "easy", label: "Easy", color: "success" },
  { id: "medium", label: "Medium", color: "warning" },
  { id: "hard", label: "Hard", color: "destructive" },
];

const companies = [
  { id: "google", name: "Google", logo: "🔵" },
  { id: "amazon", name: "Amazon", logo: "🟠" },
  { id: "microsoft", name: "Microsoft", logo: "🟢" },
  { id: "meta", name: "Meta", logo: "🔷" },
  { id: "infosys", name: "Infosys", logo: "🟣" },
];

const sampleQuestions = [
  "Tell me about yourself and your experience in software development.",
  "Can you describe a challenging project you worked on?",
  "How do you approach problem-solving in your work?",
  "What are your greatest strengths and weaknesses?",
];

interface Message {
  id: number;
  type: "ai" | "user";
  content: string;
}

const Interview = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const startInterview = () => {
    setIsStarted(true);
    // Add initial AI message
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          type: "ai",
          content: `Welcome! I'm your AI interviewer${selectedCompany ? ` from ${companies.find(c => c.id === selectedCompany)?.name}` : ""}. Let's begin with a ${selectedDifficulty} level interview. ${sampleQuestions[0]}`,
        },
      ]);
    }, 500);

    // Start timer
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const nextIndex = questionIndex + 1;
      
      if (nextIndex < sampleQuestions.length) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "ai",
            content: `Great answer! ${sampleQuestions[nextIndex]}`,
          },
        ]);
        setQuestionIndex(nextIndex);
      } else {
        // End interview
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            type: "ai",
            content: "Thank you for completing the interview! Let me analyze your responses and provide feedback.",
          },
        ]);
        setTimeout(() => {
          navigate("/feedback");
        }, 2000);
      }
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen animated-gradient pt-24 pb-12 px-4">
      <FloatingElements />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            /* Setup Screen */
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  AI Interview <span className="gradient-text-accent">Simulator</span>
                </h1>
                <p className="text-muted-foreground">
                  Practice with realistic AI-powered mock interviews
                </p>
              </div>

              {/* AI Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-6 rounded-3xl glass-card border border-secondary/30 shadow-[0_0_40px_hsl(var(--secondary)/0.3)]"
                  >
                    <Bot className="w-16 h-16 text-secondary" />
                  </motion.div>
                  {/* Pulse rings */}
                  <div className="absolute inset-0 animate-ping rounded-3xl bg-secondary/20 opacity-75" style={{ animationDuration: "2s" }} />
                </div>
              </motion.div>

              {/* Difficulty Selection */}
              <GlassCard className="mb-6">
                <h3 className="font-display font-semibold mb-4">Select Difficulty</h3>
                <div className="flex flex-wrap gap-3">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`
                        px-6 py-3 rounded-lg font-medium transition-all duration-300
                        ${selectedDifficulty === diff.id
                          ? diff.color === "success"
                            ? "bg-success/20 text-success border border-success/50 shadow-[0_0_15px_hsl(var(--success)/0.3)]"
                            : diff.color === "warning"
                            ? "bg-warning/20 text-warning border border-warning/50 shadow-[0_0_15px_hsl(var(--warning)/0.3)]"
                            : "bg-destructive/20 text-destructive border border-destructive/50 shadow-[0_0_15px_hsl(var(--destructive)/0.3)]"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      `}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Company Selection */}
              <GlassCard className="mb-8">
                <h3 className="font-display font-semibold mb-4">Company-Specific Interview (Optional)</h3>
                <div className="flex flex-wrap gap-3">
                  {companies.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                        ${selectedCompany === company.id
                          ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      `}
                    >
                      <span className="text-lg">{company.logo}</span>
                      {company.name}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Start Button */}
              <div className="flex justify-center">
                <Button variant="glow" size="xl" onClick={startInterview}>
                  <Play className="w-5 h-5" />
                  Start Interview
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Interview Screen */
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-[calc(100vh-8rem)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/30">
                    <Bot className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Interviewer</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedCompany ? companies.find(c => c.id === selectedCompany)?.name : "General"} • {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm text-foreground">{formatTime(timer)}</span>
                </div>
              </div>

              {/* Chat Container */}
              <GlassCard className="h-[calc(100%-180px)] flex flex-col p-4">
                <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 mb-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`
                        p-2 rounded-full shrink-0
                        ${message.type === "ai" 
                          ? "bg-secondary/20 border border-secondary/30" 
                          : "bg-primary/20 border border-primary/30"
                        }
                      `}>
                        {message.type === "ai" ? (
                          <Bot className="w-5 h-5 text-secondary" />
                        ) : (
                          <User className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className={`
                        max-w-[80%] p-4 rounded-2xl
                        ${message.type === "ai" 
                          ? "chat-bubble-ai" 
                          : "chat-bubble-user text-primary-foreground"
                        }
                      `}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="p-2 rounded-full bg-secondary/20 border border-secondary/30">
                        <Bot className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="chat-bubble-ai">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Waveform Display */}
                {isMicActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-4 rounded-lg bg-muted/50 border border-primary/30"
                  >
                    <AudioWaveform isActive={isMicActive} />
                    <p className="text-center text-xs text-muted-foreground mt-2">Listening...</p>
                  </motion.div>
                )}

                {/* Input Area */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsMicActive(!isMicActive)}
                    className={`
                      p-3 rounded-xl transition-all duration-300
                      ${isMicActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)] pulse-glow"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }
                    `}
                  >
                    {isMicActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your response..."
                    className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button 
                    variant="glow" 
                    size="icon" 
                    onClick={sendMessage}
                    disabled={!inputValue.trim()}
                    className="w-12 h-12"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Interview;
