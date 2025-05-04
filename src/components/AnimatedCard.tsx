// /src/components/AnimatedCard.tsx
import { motion } from "framer-motion";

interface AnimatedCardProps {
  cardName: string; // like "ace_of_spades" or "2_of_hearts"
}

export default function AnimatedCard({ cardName }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      className="w-[100px] h-[140px] p-2 bg-white rounded-lg shadow-md flex items-center justify-center"
    >
      <img
        src={`/cards/${cardName}.svg`}
        alt={cardName}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}