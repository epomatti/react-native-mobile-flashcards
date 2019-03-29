import { AsyncStorage } from 'react-native'

export function fetchDecks() {
  return AsyncStorage.getItem('DECKS')
    .then(decks => JSON.parse(decks))
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem('DECKS', JSON.stringify({ [deck.title]: deck }))
}