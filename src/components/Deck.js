import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }
  toAddCard = () => {
    const { deckId } = this.props.navigation.state.params
    this.props.navigation.navigate('AddCard', { deckId })
  }
  render() {
    const { title, cards } = this.props.deck
    return (
      <Card key={title}>
        <CardItem>
          <Body>
            <Text>{cards.length} cards</Text>
            <Button bordered onPress={() => this.toAddCard()}>
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