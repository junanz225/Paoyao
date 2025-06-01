import AnimatedCard from './AnimatedCard.tsx';

interface PlayerHandProps {
  cards: string[];
  direction?: 'horizontal' | 'vertical';
}

export default function PlayerHand({ cards, direction = 'horizontal' }: PlayerHandProps) {
  const isVertical = direction === 'vertical';

  return (
    <div
      className={`relative ${isVertical ? 'w-[100px]' : 'h-[140px]'}`}
      style={{
        height: isVertical ? `${(cards.length - 1) * 20 + 140}px` : undefined,
        width: isVertical ? '100px' : `${(cards.length - 1) * 20 + 100}px`,
        overflow: 'visible',
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            left: isVertical ? undefined : `${idx * 20}px`,
            top: isVertical ? `${idx * 20}px` : undefined,
            zIndex: idx
          }}
        >
          <AnimatedCard
            cardName={card}
            partial={idx !== cards.length - 1}
            direction={direction}
          />
        </div>
      ))}
    </div>
  );
}