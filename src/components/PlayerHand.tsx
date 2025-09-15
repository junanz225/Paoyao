import { useState } from 'react';
import AnimatedCard from './AnimatedCard.tsx';

interface PlayerHandProps {
  cards: string[];
  direction?: 'horizontal' | 'vertical';
  playerName: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export default function PlayerHand({
  cards,
  direction = 'horizontal',
  playerName,
  position,
}: PlayerHandProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const isBottom = position === 'bottom';
  const isVertical = direction === 'vertical';
  const isSide = position === 'left' || position === 'right';

  const toggleCard = (idx: number) => {
    if (!isBottom) return;
    setSelectedIndexes(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const renderName = () => {
    if (isSide) {
      return (
        <div className="text-black text-2xl font-bold text-center leading-tight whitespace-pre">
          {playerName.split('').join('\n')}
        </div>
      );
    }
    return (
      <div className="text-black text-2xl font-bold text-center whitespace-nowrap">
        {playerName}
      </div>
    );
  };

  const layoutClasses = {
    left: 'flex flex-row-reverse items-center gap-2',
    right: 'flex flex-row items-center gap-2',
    top: 'flex flex-col-reverse items-center gap-2',
    bottom: 'flex flex-col items-center gap-2',
  }[position];

  return (
    <div className={`${layoutClasses} relative`}>
      {renderName()}
      <div
        className="relative"
        style={{
          width: isVertical ? 100 : (cards.length - 1) * 20 + 100,
          height: isVertical ? (cards.length - 1) * 20 + 140 : 140,
        }}
      >
        {cards.map((card, idx) => {
          const selected = selectedIndexes.includes(idx);
          const isLast = idx === cards.length - 1;
          const offset = idx * 20;

          return (
            <div
              key={idx}
              onClick={() => toggleCard(idx)}
              style={{
                position: 'absolute',
                left: isVertical ? undefined : `${offset}px`,
                top: isVertical ? `${offset}px` : selected ? '-20px' : '0px',
                zIndex: idx,

                overflow: selected ? 'visible' : (isLast ? 'visible' : 'hidden'),

                height: isVertical ? (isLast ? '140px' : '40px') : '140px',
                width: isVertical ? '100px' : (isLast ? '100px' : '40px'),
                transition: 'top 0.2s ease',
              }}
            >
              <AnimatedCard
                cardName={card}
                partial={!isLast && !selected}
                direction={direction}
                selected={selected}
              />
            </div>
          );
        })}
      </div>
      {selectedIndexes.length > 0 && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
                onClick={() => console.log("Selected:", selectedCards)}
              >
                Confirm
              </button>
            )}
    </div>
  );
}