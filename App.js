import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import { Root } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from './src/components/DeckList'
import NewDeck from './src/components/NewDeck'
import logger from 'redux-logger'

const StackNavigator = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck'
    }
  }
})

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state
    return (
      <Provider store={createStore(reducer, applyMiddleware(logger))}>
        <Root>
          {loading === false &&
            <MainNavigator />
          }
        </Root>
      </Provider>
    );
  }
}