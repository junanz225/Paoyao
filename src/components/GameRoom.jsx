import React, { useEffect, useState } from 'react';
import PlayerSlot from './PlayerSlot';
import { v4 as uuidv4 } from 'uuid';

export default function GameRoom() {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    const newPlayerId = uuidv4(); // this will eventually be handled via WebSocket
    setPlayerId(newPlayerId);

    // TEMP SIMULATION: pretend a new player joins every second
    const interval = setInterval(() => {
      setPlayers(prev => {
        if (prev.length < 4) {
          return [...prev, { id: uuidv4(), name: `Player ${prev.length + 1}` }];
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-[400px] text-center">
      <h2 className="text-xl font-bold mb-4">Paoyao Game Room</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[0, 1, 2, 3].map(index => (
          <PlayerSlot
            key={index}
            player={players[index]}
            isSelf={players[index]?.id === playerId}
            slotNumber={index + 1}
          />
        ))}
      </div>
      {players.length === 4 ? (
        <p className="text-green-600 font-semibold">Game is starting!</p>
      ) : (
        <p className="text-gray-500">Waiting for players to join...</p>
      )}
    </div>
  );
}