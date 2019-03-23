import React, { Component } from 'react'
import { Container, Button, Text } from 'native-base'

class DeckList extends Component {
  render() {
    return (
      <Container>
        <Text>You don't have any decks</Text>
        <Button>
          <Text>Create Deck</Text>
        </Button>
      </Container >
    );
  }
}

export default DeckList;