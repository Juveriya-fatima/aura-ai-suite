import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "accent" | "none";
  hover?: boolean;
}

export const GlassCard = ({
  children,
  className,
  glow = "none",
  hover = true,
  ...props
}: GlassCardProps) => {
  const glowStyles = {
    primary: "shadow-[0_0_30px_hsl(var(--primary)/0.15)]",
    accent: "shadow-[0_0_30px_hsl(var(--secondary)/0.15)]",
    none: "",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass-card p-6",
        glowStyles[glow],
        hover && "hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)] hover:border-primary/30",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
