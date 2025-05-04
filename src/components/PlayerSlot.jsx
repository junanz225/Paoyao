import React from 'react';

export default function PlayerSlot({ player, isSelf, slotNumber }) {
  return (
    <div className={`p-4 border rounded-lg ${isSelf ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {player ? (
        <span className="font-medium">
          {player.name} {isSelf && '(You)'}
        </span>
      ) : (
        <span className="text-gray-400">Empty Seat {slotNumber}</span>
      )}
    </div>
  );
}