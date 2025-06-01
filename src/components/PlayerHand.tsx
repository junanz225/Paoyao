import AnimatedCard from './AnimatedCard.tsx';

interface PlayerHandProps {
  cards: string[];
  direction?: 'horizontal' | 'vertical';
  playerName: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export default function PlayerHand({ cards, direction = 'horizontal', playerName, position }: PlayerHandProps) {
  const isVertical = direction === 'vertical';
  const isSide = position === 'left' || position === 'right';

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

  // Wrapper alignment
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
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: isVertical ? undefined : `${idx * 20}px`,
              top: isVertical ? `${idx * 20}px` : undefined,
              zIndex: idx,
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
    </div>
  );
}