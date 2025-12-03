import { motion } from "framer-motion";

interface AudioWaveformProps {
  isActive?: boolean;
}

export const AudioWaveform = ({ isActive = true }: AudioWaveformProps) => {
  const bars = 12;

  return (
    <div className="flex items-center justify-center gap-0.5 h-10">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary to-neon-cyan rounded-full"
          animate={
            isActive
              ? {
                  height: [8, Math.random() * 32 + 8, 8],
                }
              : { height: 8 }
          }
          transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
};
