import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";
import { ScoreGauge } from "@/components/ScoreGauge";

// Mock data for demonstration
const resumeContent = {
  skills: [
    { text: "Python", matched: true },
    { text: "JavaScript", matched: true },
    { text: "React", matched: true },
    { text: "Node.js", matched: true },
    { text: "SQL", matched: true },
    { text: "Git", matched: true },
    { text: "REST APIs", matched: true },
    { text: "AWS", matched: false },
  ],
  experience: [
    { text: "3+ years of software development experience", matched: true },
    { text: "Built and deployed production applications", matched: true },
    { text: "Worked in Agile/Scrum environment", matched: true },
    { text: "Led team of 3 junior developers", matched: false },
  ],
  education: [
    { text: "Bachelor's in Computer Science", matched: true },
    { text: "Relevant coursework in algorithms", matched: true },
  ],
};

const jobRequirements = {
  required: [
    { text: "5+ years Python experience", matched: true, partial: false },
    { text: "Strong JavaScript/TypeScript skills", matched: true, partial: false },
    { text: "Experience with React or Vue", matched: true, partial: false },
    { text: "AWS/GCP cloud experience", matched: false, partial: false },
    { text: "Machine Learning background", matched: false, partial: false },
  ],
  preferred: [
    { text: "Experience with Docker/Kubernetes", matched: false, partial: true },
    { text: "CI/CD pipeline experience", matched: false, partial: false },
    { text: "Team leadership experience", matched: false, partial: true },
    { text: "Agile methodology", matched: true, partial: false },
  ],
};

const Compare = () => {
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "education">("skills");

  const matchPercentage = 72;

  return (
    <div className="min-h-screen animated-gradient pt-24 pb-12 px-4">
      <FloatingElements />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Resume vs <span className="gradient-text">Job Description</span>
          </h1>
          <p className="text-muted-foreground">
            See how your resume matches the job requirements
          </p>
        </motion.div>

        {/* Match Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <GlassCard glow="primary" className="inline-flex items-center gap-6 px-8">
            <ScoreGauge score={matchPercentage} label="Match Score" size="md" color="primary" />
            <div className="text-left">
              <p className="text-lg font-semibold text-foreground">Good Match!</p>
              <p className="text-sm text-muted-foreground">
                You meet 72% of the requirements
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Resume Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">Your Resume</h3>
                  <p className="text-sm text-muted-foreground">Extracted content</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {(["skills", "experience", "education"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${activeTab === tab 
                        ? "bg-primary/20 text-primary border border-primary/30" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
                {resumeContent[activeTab].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border transition-colors
                      ${item.matched 
                        ? "bg-success/5 border-success/30" 
                        : "bg-destructive/5 border-destructive/30"
                      }
                    `}
                  >
                    {item.matched ? (
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    )}
                    <span className={`text-sm ${item.matched ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Job Requirements Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/30">
                  <Briefcase className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">Job Requirements</h3>
                  <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-destructive/20 text-destructive text-xs">Required</span>
                </h4>
                <div className="space-y-2 max-h-[180px] overflow-y-auto scrollbar-thin pr-2">
                  {jobRequirements.required.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg border
                        ${req.matched 
                          ? "bg-success/5 border-success/30" 
                          : "bg-destructive/5 border-destructive/30"
                        }
                      `}
                    >
                      {req.matched ? (
                        <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive shrink-0" />
                      )}
                      <span className={`text-sm ${req.matched ? "text-foreground" : "text-muted-foreground"}`}>
                        {req.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Preferred Skills */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-warning/20 text-warning text-xs">Preferred</span>
                </h4>
                <div className="space-y-2 max-h-[180px] overflow-y-auto scrollbar-thin pr-2">
                  {jobRequirements.preferred.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg border
                        ${req.matched 
                          ? "bg-success/5 border-success/30" 
                          : req.partial 
                            ? "bg-warning/5 border-warning/30"
                            : "bg-muted/30 border-border/50"
                        }
                      `}
                    >
                      {req.matched ? (
                        <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      ) : req.partial ? (
                        <div className="w-4 h-4 rounded-full border-2 border-warning shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {req.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <GlassCard hover={false} className="inline-flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Matched</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-warning" />
              <span className="text-sm text-muted-foreground">Partial Match</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Missing</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button variant="glow" size="lg" asChild>
            <a href="/interview">
              Practice Interview for This Role
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Compare;
