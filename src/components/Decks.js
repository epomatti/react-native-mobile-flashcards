import React, { Component } from 'react'
import { Container, Button, Text, Header, Body, Title } from 'native-base'
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
  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <Container><Text>Loading decks</Text></Container>
    }
    if (Object.keys(decks).length === undefined) {
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
    }
    return (
      <Container>
        {
          Object.keys(decks).map(key => (
            <Text key={key}>{key}</Text>
          ))
        }
      </Container>
    )
  }
}
function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(Decks);