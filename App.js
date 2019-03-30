import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './src/reducers'
import { Root } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import Decks from './src/components/Decks'
import NewDeck from './src/components/NewDeck'
import Deck from './src/components/Deck'
import logger from 'redux-logger'
import { combineReducers } from 'redux'
import { Constants } from "expo"
import { View } from 'react-native'
import { AsyncStorage } from 'react-native'

const store = createStore(combineReducers({ decks }), applyMiddleware(logger))

const Tabs = createMaterialTopTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        height: 56
      }
    }
  })

const StackNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  }
}, {
    headerMode: 'none'
  })

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  async componentDidMount() {
    //AsyncStorage.clear() 
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
      <Provider store={store}>
        <Root>
          <View style={{ height: Constants.statusBarHeight }} />
          {loading === false &&
            <MainNavigator />
          }
        </Root>
      </Provider>
    );
  }
}