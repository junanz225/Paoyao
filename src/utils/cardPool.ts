// Generates a list of 54 cards (standard + jokers), used twice = 108 cards
const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

const singleDeck = suits.flatMap(suit =>
  values.map(value => `${value}_of_${suit}`)
).concat(['black_joker', 'red_joker']);

export const fullDeck = [...singleDeck, ...singleDeck]; // 108 cards