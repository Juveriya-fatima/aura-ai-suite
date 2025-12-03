import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MessageSquare, TrendingUp, AlertCircle, Lightbulb, 
  BarChart3, RefreshCw, Home, ThumbsUp, ThumbsDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { ProgressBar } from "@/components/ProgressBar";

const strengths = [
  {
    title: "Clear Communication",
    description: "Your answers were well-structured and easy to follow.",
  },
  {
    title: "Technical Knowledge",
    description: "Demonstrated solid understanding of core concepts.",
  },
  {
    title: "Problem-Solving Approach",
    description: "Showed logical thinking when explaining solutions.",
  },
];

const weaknesses = [
  {
    title: "Response Length",
    description: "Some answers could be more concise. Aim for 60-90 second responses.",
  },
  {
    title: "Specific Examples",
    description: "Include more concrete examples from past experiences.",
  },
];

const suggestions = [
  {
    question: "Tell me about yourself",
    original: "I'm a software developer with experience in various technologies.",
    improved: "I'm a software developer with 5 years of experience specializing in React and Node.js. Most recently, I led the frontend development of an e-commerce platform that increased conversions by 40%.",
  },
  {
    question: "Describe a challenging project",
    original: "I worked on a difficult project where we had tight deadlines.",
    improved: "I led a team of 4 developers to rebuild our legacy payment system in 3 months. Despite a compressed timeline, we reduced transaction failures by 60% and improved processing speed by 2x through strategic microservices architecture.",
  },
];

const Feedback = () => {
  return (
    <div className="min-h-screen animated-gradient pt-24 pb-12 px-4">
      <FloatingElements />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-4">
            <MessageSquare className="w-4 h-4 text-success" />
            <span className="text-sm text-success font-medium">Interview Complete</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your Interview <span className="gradient-text">Feedback</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered analysis of your interview performance
          </p>
        </motion.div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="primary" className="text-center">
              <ScoreGauge score={75} label="Overall Score" size="md" color="primary" />
            </GlassCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="text-center">
              <ScoreGauge score={82} label="Communication" size="md" color="success" />
            </GlassCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center">
              <ScoreGauge score={68} label="Confidence" size="md" color="warning" />
            </GlassCard>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Performance Breakdown</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ProgressBar value={85} label="Clarity of Expression" color="success" />
                <ProgressBar value={72} label="Technical Accuracy" color="primary" />
                <ProgressBar value={65} label="Response Relevance" color="warning" />
              </div>
              <div className="space-y-4">
                <ProgressBar value={78} label="Tone & Professionalism" color="primary" />
                <ProgressBar value={60} label="Use of Examples" color="warning" />
                <ProgressBar value={88} label="Grammar & Vocabulary" color="success" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard glow="primary" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-success/10 border border-success/30">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-display font-semibold">Strengths</h3>
              </div>
              <div className="space-y-4">
                {strengths.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                  >
                    <ThumbsUp className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-warning/10 border border-warning/30">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-display font-semibold">Areas to Improve</h3>
              </div>
              <div className="space-y-4">
                {weaknesses.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20"
                  >
                    <ThumbsDown className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Answer Improvement Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/30">
                <Lightbulb className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-semibold">Answer Improvement Suggestions</h3>
            </div>
            <div className="space-y-6">
              {suggestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="p-4 rounded-lg bg-muted/30 border border-border/50"
                >
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Q: "{item.question}"
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-xs font-medium text-destructive mb-2">Your Answer:</p>
                      <p className="text-sm text-muted-foreground">{item.original}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-xs font-medium text-success mb-2">Improved Version:</p>
                      <p className="text-sm text-foreground">{item.improved}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <GlassCard glow="accent" className="text-center">
            <h3 className="font-display text-xl font-semibold mb-2">
              Practice Makes Perfect!
            </h3>
            <p className="text-muted-foreground mb-6">
              Try another interview or explore other tools to improve your profile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glow-accent" asChild>
                <Link to="/interview">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Link>
              </Button>
              <Button variant="glass" asChild>
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
