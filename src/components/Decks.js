import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Button, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'
import { retrieveDecks } from '../actions';
import * as Api from '../utils/api'

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    const { dispatch } = this.props
    Api.fetchDecks()
      .then(decks => dispatch(retrieveDecks(decks)))
      .then(this.setState({ ready: true }))
  }
  toDeck = (id) => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Deck' }))
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <Container><Text>Loading decks</Text></Container>
    }
    if (ready === true && Object.keys(decks).length === 0) {
      return (
        <Container>
          <Text>You don't have any decks</Text>
          <Button onPress={() => this.props.navigation.navigate(
            'NewDeck'
          )}>
            <Text>Create Deck</Text>
          </Button>
        </Container >
      )
    } else {
      return (
        <Container>
          {
            Object.keys(decks).map(key => (

              <TouchableOpacity key={key}
                onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { deckId: key }
                )}
              >
                <Card >
                  <CardItem header>
                    <Text>{key}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{decks[key].cards.length} cards</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))
          }
        </Container>
      )
    }
  }
}
function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);