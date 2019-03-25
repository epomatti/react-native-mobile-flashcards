import { AsyncStorage } from 'react-native'

export function fetchDecks() {
  return AsyncStorage.getItem('DECKS')
    .then(decks => decks === null ? {} : decks)
}