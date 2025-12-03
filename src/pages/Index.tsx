import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, FileText, MessageSquare, Sparkles, Target, Zap, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";

const features = [
  {
    icon: FileText,
    title: "AI Resume Analysis",
    description: "Get instant feedback on your resume with ATS scoring and keyword optimization.",
  },
  {
    icon: Target,
    title: "Job Match Scoring",
    description: "Compare your resume against job descriptions to maximize your match rate.",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Practice with AI-powered interviews tailored to your target companies.",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "Receive personalized recommendations to improve your profile.",
  },
];

const stats = [
  { value: "50K+", label: "Resumes Analyzed" },
  { value: "95%", label: "Success Rate" },
  { value: "500+", label: "Companies Covered" },
  { value: "24/7", label: "AI Available" },
];

const Index = () => {
  return (
    <div className="min-h-screen animated-gradient overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Career Tools</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Your Personal AI for{" "}
              <span className="gradient-text">Resume Scoring</span>
              <br />& <span className="gradient-text-accent">Interview Training</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Analyze your resume with AI, get instant ATS scores, and practice with 
              realistic mock interviews tailored to top tech companies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="glow" size="xl" asChild>
                <Link to="/upload" className="group">
                  <FileText className="w-5 h-5" />
                  Upload Resume
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="glow-outline" size="xl" asChild>
                <Link to="/interview">
                  <MessageSquare className="w-5 h-5" />
                  Start Interview Simulation
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* AI Animation / Brain Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mt-16 flex justify-center"
          >
            <div className="relative">
              {/* Glowing orb background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-3xl scale-150" />
              
              {/* Brain icon with animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="p-8 rounded-3xl glass-card border border-primary/30">
                  <Brain className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                  
                  {/* Orbiting elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Land Your Dream Job</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to optimize your resume 
              and prepare for interviews at top companies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard glow="primary" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text-accent">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Upload Resume", desc: "Upload your resume in PDF or DOCX format" },
              { step: 2, title: "AI Analysis", desc: "Our AI analyzes and scores your resume" },
              { step: 3, title: "Get Results", desc: "Receive detailed feedback and suggestions" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard glow="accent" className="text-center p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Supercharge Your Job Search?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of job seekers who have improved their resumes and 
                aced their interviews with our AI tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glow" size="lg" asChild>
                  <Link to="/upload">
                    <CheckCircle className="w-5 h-5" />
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-display font-bold gradient-text">ResumeAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
