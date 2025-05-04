import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PlayerHand from './components/PlayerHand.tsx';
import { fullDeck } from './utils/cardPool.ts';

function shuffle(array: string[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [players, setPlayers] = useState({
    player1: [] as string[],
    player2: [] as string[],
    player3: [] as string[],
    player4: [] as string[],
  });

  useEffect(() => {
    const shuffled = shuffle(fullDeck);
    let index = 0;

    const interval = setInterval(() => {
      if (index >= 108) {
        clearInterval(interval);
        return;
      }

      const playerIndex = index % 4;
      const card = shuffled[index];
      const playerKey = `player${playerIndex + 1}` as keyof typeof players;

      setPlayers(prev => ({
        ...prev,
        [playerKey]: [...prev[playerKey], card]
      }));

      index++;
    }, 100); // one card every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-green-300 p-8 flex flex-col items-center justify-between">
      {/* Top row */}
      <div className="flex justify-between w-full max-w-5xl mb-10">
        <PlayerHand cards={players.player1} />
        <PlayerHand cards={players.player2} />
      </div>

      {/* Play Area */}
      <div className="text-xl font-bold mb-10">Dealing Cards...</div>

      {/* Bottom row */}
      <div className="flex justify-between w-full max-w-5xl">
        <PlayerHand cards={players.player3} />
        <PlayerHand cards={players.player4} />
      </div>
    </div>
  );
}