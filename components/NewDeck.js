import React, { Component } from 'react'
import { Container, Button, Text, Header, Body, Title, Left, Icon } from 'native-base'
import { connect } from 'react-redux'

class NewDeck extends Component {
  render() {
    return (
      <Container>
        <Text>You don't have any decks</Text>
        <Button onPress={() => this.props.navigation.navigate(
          'NewDeck'
        )}>
          <Text>Create Deck</Text>
        </Button>
      </Container >
    );
  }
}

export default connect()(NewDeck);