import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  label: string;
  color?: "primary" | "accent" | "success" | "warning";
  showValue?: boolean;
}

export const ProgressBar = ({
  value,
  label,
  color = "primary",
  showValue = true,
}: ProgressBarProps) => {
  const colorConfig = {
    primary: "bg-gradient-to-r from-primary to-neon-cyan",
    accent: "bg-gradient-to-r from-secondary to-neon-pink",
    success: "bg-success",
    warning: "bg-warning",
  };

  const glowConfig = {
    primary: "shadow-[0_0_10px_hsl(var(--primary)/0.5)]",
    accent: "shadow-[0_0_10px_hsl(var(--secondary)/0.5)]",
    success: "shadow-[0_0_10px_hsl(var(--success)/0.5)]",
    warning: "shadow-[0_0_10px_hsl(var(--warning)/0.5)]",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
        {showValue && (
          <span className="text-sm font-medium text-foreground">{value}%</span>
        )}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", colorConfig[color], glowConfig[color])}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
