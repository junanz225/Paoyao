import AnimatedCard from './AnimatedCard.tsx';

interface PlayerHandProps {
  cards: string[];
}

export default function PlayerHand({ cards }: PlayerHandProps) {
  return (
    <div className="relative h-[140px]">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            left: `${idx * 20}px`, // adjust this value for spacing
            zIndex: idx
          }}
        >
          <AnimatedCard cardName={card} partial={idx !== cards.length - 1} />
        </div>
      ))}
    </div>
  );
}