import React, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-green-300 p-2 flex items-center justify-center">
      <div className="relative w-screen h-screen bg-green-300">
        {/* Table (centered) */}
        <div className="absolute top-1/2 left-1/2 w-[65vw] h-[35vw] bg-green-600 shadow-inner
                        -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-2xl font-bold">
          Table
        </div>

        {/* Top Player (Player 1) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <PlayerHand cards={players.player1} direction="horizontal" />
        </div>

        {/* Bottom Player (Player 3) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <PlayerHand cards={players.player3} direction="horizontal" />
        </div>

        {/* Left Player (Player 4) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <PlayerHand cards={players.player4} direction="vertical" />
        </div>

        {/* Right Player (Player 2) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <PlayerHand cards={players.player2} direction="vertical" />
        </div>
      </div>
    </div>
  );
}