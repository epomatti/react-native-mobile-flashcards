import React, { Component } from 'react';
import { Button, VStack, Box, Text, Center } from 'native-base';
import { connect } from 'react-redux';

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
  startQuiz = () => {
    const { deckId } = this.props.navigation.state.params
    this.props.navigation.navigate('Quiz', { deckId })
  }
  render() {
    const { title, cards } = this.props.deck
    return (
      <Box key={title}>
        <VStack space="2.5" mt="4" px="8">
          <Center>
            <Text fontSize="6xl">{cards.length} cards</Text>
          </Center>
          <Button onPress={() => this.toAddCard()} size="lg">
            Add Card
          </Button>
          <Button colorScheme="secondary" onPress={() => this.startQuiz()} size="lg">
            Start Quiz
          </Button>
        </VStack>
      </Box>
    );
  }
}
function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
  }
}
export default connect(mapStateToProps)(Deck);