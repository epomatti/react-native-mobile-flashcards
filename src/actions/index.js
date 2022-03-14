export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RETRIEVE_PLAYS = 'RETRIEVE_PLAYS'
export const ADD_PLAY = 'ADD_PLAY'

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

export function retrievePlays(plays) {
  return {
    type: RETRIEVE_PLAYS,
    plays
  }
}

export function addPlay(play) {
  return {
    type: ADD_PLAY,
    play
  }
}
