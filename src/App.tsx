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
    <div className="min-h-screen bg-green-300 p-8 flex items-center justify-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-4 items-center justify-center">
        {/* Top (Player 1) */}
        <div className="col-span-3 flex justify-center">
          <PlayerHand cards={players.player1} />
        </div>

        {/* Left (Player 4) */}
        <div className="row-span-1 flex justify-center">
          <PlayerHand cards={players.player4} />
        </div>

        {/* Center Table */}
        <div className="w-[30vw] h-[30vw] bg-green-600 shadow-inner flex items-center justify-center text-white text-2xl font-bold">
          Table
        </div>

        {/* Right (Player 2) */}
        <div className="row-span-1 flex justify-center">
          <PlayerHand cards={players.player2} />
        </div>

        {/* Bottom (Player 3) */}
        <div className="col-span-3 flex justify-center">
          <PlayerHand cards={players.player3} />
        </div>
      </div>
    </div>
  );
}