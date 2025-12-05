import { analyzeResume } from "../api";
import { analyzeResume, saveForm } from "../api";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, FileText, CheckCircle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/FloatingElements";
import { GlassCard } from "@/components/GlassCard";

const steps = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Analyze" },
  { id: 3, label: "Dashboard" },
];

const Upload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleUpload = async () => {
  if (!file) {
    alert("Please upload a file first");
    return;
  }

  setIsAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(${import.meta.env.VITE_BACKEND_URL}/upload, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Upload result:", result);

    // Optionally go to next screen
    setCurrentStep(2);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed");
  }

  setIsAnalyzing(false);
};

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || 
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setCurrentStep(2);
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setCurrentStep(3);
    setIsAnalyzing(false);
    
    // Navigate to dashboard after a brief delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen animated-gradient pt-24 pb-12 px-4">
      <FloatingElements />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Stepper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                    }}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm
                      transition-all duration-300
                      ${currentStep >= step.id 
                        ? "bg-gradient-to-r from-primary to-[hsl(186,100%,50%)] text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.5)]" 
                        : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  <span className={`hidden sm:block text-sm font-medium ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-colors duration-300
                    ${currentStep > step.id ? "bg-primary" : "bg-muted"}
                  `} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard glow="primary" hover={false} className="p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Upload Your <span className="gradient-text">Resume</span>
              </h1>
              <p className="text-muted-foreground">
                Drag and drop your resume or click to browse
              </p>
            </div>

            {/* Drop Zone */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              animate={{
                borderColor: isDragging ? "hsl(var(--primary))" : "hsl(var(--border))",
                backgroundColor: isDragging ? "hsl(var(--primary) / 0.1)" : "transparent",
              }}
              className={`
                relative border-2 border-dashed rounded-xl p-12
                transition-all duration-300 cursor-pointer
                ${isDragging ? "neon-border" : "border-border hover:border-primary/50"}
              `}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
              
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="p-4 rounded-full bg-primary/10 border border-primary/30 mb-4"
                    >
                      <UploadIcon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <p className="text-foreground font-medium mb-2">
                      Drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOCX (Max 10MB)
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <div className="p-3 rounded-xl bg-success/10 border border-success/30">
                      <FileText className="w-8 h-8 text-success" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {!isAnalyzing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Analyze Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: file ? 1 : 0.5 }}
              className="mt-8 flex justify-center"
            >
              <Button
                variant="glow"
                size="xl"
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Analyzing Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">AI is analyzing your resume...</p>
                    <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                  </div>
                </div>
                
                {/* Progress indicators */}
                <div className="mt-4 space-y-2">
                  {["Extracting text...", "Analyzing keywords...", "Calculating ATS score..."].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.8 }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-success" />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Upload;
