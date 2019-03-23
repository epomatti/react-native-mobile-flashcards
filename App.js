import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
//import DeckList from './components/DeckList'
import { Container, Header, Content, Button, Text } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Container>
          <Header />
          <Content>
            <Button>
              <Text>Create Deck</Text>
            </Button>
          </Content>
        </Container>
      </Provider>
    );
  }
}