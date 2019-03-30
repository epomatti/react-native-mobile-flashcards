export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function retrieveDecks(decks) {
  return {
    type: RETRIEVE_DECKS,
    decks,
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard(deck) {
  return {
    type: ADD_CARD,
    deck,
  }
}