import { RETRIEVE_DECKS, ADD_DECK, ADD_CARD, RETRIEVE_PLAYS, ADD_PLAY } from '../actions/index.js'

export function decks(state = {}, action) {
  switch (action.type) {
    case RETRIEVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deck.title]: { ...action.deck }
      }
    default:
      return state
  }
}

export function plays(state = {}, action) {
  switch (action.type) {
    case RETRIEVE_PLAYS:
      return {
        ...state,
        ...action.plays
      }
    case ADD_PLAY:
      return {
        ...state,
        [action.play.timestamp]: action.play
      }
    default:
      return state
  }
}