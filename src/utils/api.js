import AsyncStorage from '@react-native-community/async-storage'

export function fetchDecks() {
  return AsyncStorage.getItem('decks').then(decks => JSON.parse(decks))
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem('decks', JSON.stringify({ [deck.title]: deck }))
}

export function submitPlay(play) {
  return AsyncStorage.mergeItem('decks', JSON.stringify({ [deck.title]: deck }))
}