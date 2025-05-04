// /src/components/AnimatedCard.tsx
import { motion } from "framer-motion";

interface AnimatedCardProps {
  cardName: string;
  partial?: boolean;
}

export default function AnimatedCard({ cardName, partial = false }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`h-[140px] ${partial ? 'w-[30px]' : 'w-[100px]'} bg-white rounded-md shadow-md overflow-hidden`}
    >
      <img
        src={`/cards/${cardName}.svg`}
        alt={cardName}
        className="h-full w-[100px] object-left object-cover"
      />
    </motion.div>
  );
}