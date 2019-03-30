import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'

class Deck extends Component {
  render() {
    const { title, cards } = this.props.deck
    return (
      <Card key={title}>
        <CardItem header>
          <Text>{title}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{cards.length} cards</Text>
            <Button bordered>
              <Text>Add Card</Text>
            </Button>
            <Button>
              <Text>Start Quiz</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId]
  }
}
export default connect(mapStateToProps)(Deck);