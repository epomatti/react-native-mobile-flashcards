import React, { Component } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const StackNavigator = createStackNavigator({
  Home: {
    screen: DeckList
  },
  NewDeck: {
    screen: NewDeck
  }
})

const MainNavigator = createAppContainer(StackNavigator)

class AppNavigator extends Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

export default AppNavigator;