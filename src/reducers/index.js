import { RETRIEVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
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

export default decks