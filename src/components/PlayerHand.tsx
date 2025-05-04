import AnimatedCard from './AnimatedCard.tsx';

interface PlayerHandProps {
  cards: string[];
}

export default function PlayerHand({ cards }: PlayerHandProps) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {cards.map((card, idx) => (
        <AnimatedCard key={idx} cardName={card} />
      ))}
    </div>
  );
}