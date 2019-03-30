import { AsyncStorage } from 'react-native'

export function fetchDecks() {
  return AsyncStorage.getItem('decks')
    .then(decks => JSON.parse(decks))
}

export function submitDeck(deck) {
  return AsyncStorage.mergeItem('decks', JSON.stringify({ [deck.title]: deck }))
}

export function fetchCards() {
  return AsyncStorage.getItem('cards')
    .then(cards => JSON.parse(cards))
}

export function submitCard(card) {
  return AsyncStorage.mergeItem('cards', JSON.stringify({ [card.id]: card }))
}