// /src/components/AnimatedCard.tsx
import { motion } from "framer-motion";

interface AnimatedCardProps {
  cardName: string;
  partial?: boolean;
  direction?: 'horizontal' | 'vertical';
  selected?: boolean;
}

export default function AnimatedCard({
  cardName,
  partial = false,
  direction = 'horizontal',
  selected = false
}: AnimatedCardProps) {
  const isVertical = direction === 'vertical';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`
        h-[140px] w-[100px] bg-white rounded-md shadow-md
        ${partial ? 'overflow-hidden' : ''}
        ${selected ? 'border-4 border-yellow-400 -translate-y-4 z-50' : ''}
      `}
      style={
        partial
          ? isVertical
            ? { height: '40px' } // Only show top portion for vertical stacking
            : { width: '40px' }  // Only show left portion for horizontal stacking
          : {}
      }
    >
      <img
        src={`${process.env.PUBLIC_URL}/cards/${cardName}.svg`}
        alt={cardName}
        className={`h-full w-[100px] object-cover ${
          isVertical ? 'object-top' : 'object-left'
        }`}
      />
    </motion.div>
  );
}