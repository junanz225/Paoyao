import React from 'react';

export default function Paoyao() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Paoyao Room</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Player Slots */}
        <div className="w-40 h-40 bg-white border-4 border-gray-300 flex items-center justify-center text-xl font-semibold rounded-lg shadow-md">
          Player 1
        </div>
        <div className="w-40 h-40 bg-white border-4 border-gray-300 flex items-center justify-center text-xl font-semibold rounded-lg shadow-md">
          Player 2
        </div>
        <div className="w-40 h-40 bg-white border-4 border-gray-300 flex items-center justify-center text-xl font-semibold rounded-lg shadow-md">
          Player 3
        </div>
        <div className="w-40 h-40 bg-white border-4 border-gray-300 flex items-center justify-center text-xl font-semibold rounded-lg shadow-md">
          Player 4
        </div>
      </div>

      <p className="mt-8 text-lg">Waiting for players to join...</p>
    </div>
  );
}