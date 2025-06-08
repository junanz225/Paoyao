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
  position
}: PlayerHandProps) {
  const isVertical = direction === 'vertical';
  const isSide = position === 'left' || position === 'right';
  const isBottomPlayer = position === 'bottom';

  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  const toggleCard = (cardName: string) => {
    if (!isBottomPlayer) return; // Only allow selection for bottom player
    setSelectedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardName)) {
        next.delete(cardName);
      } else {
        next.add(cardName);
      }
      return next;
    });
  };

  const renderName = () => {
    if (isSide) {
      return (
        <div className="text-black text-3xl font-bold text-center leading-none whitespace-pre">
          {playerName.split('').join('\n')}
        </div>
      );
    }
    return (
      <div className="text-black text-3xl font-bold text-center whitespace-nowrap">
        {playerName}
      </div>
    );
  };

  let layoutClasses = 'flex items-center justify-center';
  if (position === 'left') layoutClasses = 'flex flex-row-reverse items-center gap-2';
  if (position === 'right') layoutClasses = 'flex flex-row items-center gap-2';
  if (position === 'top') layoutClasses = 'flex flex-col-reverse items-center gap-2';
  if (position === 'bottom') layoutClasses = 'flex flex-col items-center gap-2';

  return (
    <div className={layoutClasses + ' relative'}>
      {renderName()}
      <div
        className={`relative ${isVertical ? 'w-[100px]' : 'h-[140px]'}`}
        style={{
          height: isVertical ? `${(cards.length - 1) * 20 + 140}px` : undefined,
          width: isVertical ? '100px' : `${(cards.length - 1) * 20 + 100}px`,
          overflow: 'visible',
        }}
      >
        {cards.map((card, idx) => {
          const selected = selectedCards.has(card);
          return (
            <div
              key={`${card}-${idx}`}
              className={`absolute transition-transform duration-200 ${selected ? '-translate-y-5' : ''}`}
              style={{
                left: isVertical ? undefined : `${idx * 20}px`,
                top: isVertical ? `${idx * 20}px` : undefined,
                zIndex: idx,
                cursor: isBottomPlayer ? 'pointer' : 'default',
              }}
              onClick={() => toggleCard(card)}
            >
              <AnimatedCard
                cardName={card}
                partial={idx !== cards.length - 1}
                direction={direction}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}