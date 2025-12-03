import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, Target, Search, AlertCircle, CheckCircle, TrendingUp, 
  XCircle, ChevronRight, Download, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { ProgressBar } from "@/components/ProgressBar";

const missingKeywords = [
  "Machine Learning",
  "Data Visualization",
  "Agile Methodology",
  "CI/CD",
  "Docker",
];

const matchedKeywords = [
  { keyword: "Python", score: 95 },
  { keyword: "JavaScript", score: 88 },
  { keyword: "React", score: 82 },
  { keyword: "SQL", score: 75 },
  { keyword: "Git", score: 90 },
];

const strengths = [
  "Strong technical skills section",
  "Quantified achievements with metrics",
  "Clear and concise bullet points",
  "Good use of action verbs",
];

const weaknesses = [
  "Missing summary section",
  "Education section needs more detail",
  "Could include more soft skills",
  "LinkedIn URL not included",
];

const Dashboard = () => {
  return (
    <div className="min-h-screen animated-gradient pt-24 pb-12 px-4">
      <FloatingElements />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Resume <span className="gradient-text">Analysis</span>
            </h1>
            <p className="text-muted-foreground">
              Detailed breakdown of your resume performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="sm">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button variant="glow" size="sm" asChild>
              <Link to="/upload">
                <RefreshCw className="w-4 h-4" />
                Analyze New
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Main Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard glow="primary" className="text-center h-full">
              <div className="flex flex-col items-center">
                <ScoreGauge score={78} label="Overall Score" size="lg" color="primary" />
                <p className="text-sm text-muted-foreground mt-4">
                  Your resume is above average
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard glow="accent" className="text-center h-full">
              <div className="flex flex-col items-center">
                <ScoreGauge score={85} label="ATS Score" size="lg" color="success" />
                <p className="text-sm text-muted-foreground mt-4">
                  Great ATS compatibility
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center h-full">
              <div className="flex flex-col items-center">
                <ScoreGauge score={72} label="Job Match" size="lg" color="warning" />
                <p className="text-sm text-muted-foreground mt-4">
                  Good match for target role
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Keyword Analysis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Matched Keywords */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-success/10 border border-success/30">
                  <Search className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Keyword Match</h3>
                  <p className="text-sm text-muted-foreground">Keywords found in your resume</p>
                </div>
              </div>
              <div className="space-y-4">
                {matchedKeywords.map((item, index) => (
                  <motion.div
                    key={item.keyword}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ProgressBar
                      value={item.score}
                      label={item.keyword}
                      color={item.score > 85 ? "success" : item.score > 70 ? "primary" : "warning"}
                    />
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Missing Keywords */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Missing Keywords</h3>
                  <p className="text-sm text-muted-foreground">Consider adding these keywords</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Pro tip:</strong> Adding these keywords can 
                  increase your ATS score by up to 15%.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard glow="primary" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-success/10 border border-success/30">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-display font-semibold">Strengths</h3>
              </div>
              <div className="space-y-3">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                  >
                    <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{strength}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-warning/10 border border-warning/30">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-display font-semibold">Areas to Improve</h3>
              </div>
              <div className="space-y-3">
                {weaknesses.map((weakness, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20"
                  >
                    <XCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{weakness}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard glow="accent" className="text-center">
            <h3 className="font-display text-xl font-semibold mb-2">
              Ready for the Next Step?
            </h3>
            <p className="text-muted-foreground mb-6">
              Compare your resume against specific job descriptions or practice with mock interviews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glow" asChild>
                <Link to="/compare">
                  <Target className="w-4 h-4" />
                  Compare with Job
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="glow-accent" asChild>
                <Link to="/interview">
                  <FileText className="w-4 h-4" />
                  Start Mock Interview
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
