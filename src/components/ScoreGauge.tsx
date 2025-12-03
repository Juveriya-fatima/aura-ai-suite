import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "success" | "warning";
}

export const ScoreGauge = ({
  score,
  label,
  size = "md",
  color = "primary",
}: ScoreGaugeProps) => {
  const sizeConfig = {
    sm: { width: 80, strokeWidth: 6, fontSize: "text-lg" },
    md: { width: 120, strokeWidth: 8, fontSize: "text-2xl" },
    lg: { width: 160, strokeWidth: 10, fontSize: "text-4xl" },
  };

  const colorConfig = {
    primary: "stroke-primary",
    accent: "stroke-secondary",
    success: "stroke-success",
    warning: "stroke-warning",
  };

  const glowConfig = {
    primary: "drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
    accent: "drop-shadow-[0_0_10px_hsl(var(--secondary)/0.5)]",
    success: "drop-shadow-[0_0_10px_hsl(var(--success)/0.5)]",
    warning: "drop-shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
  };

  const { width, strokeWidth, fontSize } = sizeConfig[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${width} ${width}`}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            className={cn(colorConfig[color], glowConfig[color])}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={cn("font-display font-bold text-foreground", fontSize)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};
