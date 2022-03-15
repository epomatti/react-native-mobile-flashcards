import React, { Component } from 'react';
import { Button, Input, FormControl, VStack, Box } from 'native-base'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import * as Api from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
  submit = () => {
    const { deck, dispatch, goBack } = this.props
    deck.cards = deck.cards.concat(this.state)
    Api.submitDeck(deck)
      .then(dispatch(addCard(deck)))
    goBack()
  }
  render() {
    const { question, answer } = this.state
    return (
      <Box>
        <VStack space="2.5" mt="4" px="8">
          <FormControl isRequired>
            <FormControl.Label>
              What is the question?
            </FormControl.Label>
            <Input
              onChangeText={(value) => this.setState({ question: value })}
              placeholder='Question'
              value={question}
              size="lg"
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>
              What is the answer?
            </FormControl.Label>
            <Input
              onChangeText={(value) => this.setState({ answer: value })}
              placeholder='Answer'
              value={answer}
              size="lg"
            />
          </FormControl>
          <FormControl>
            <Button onPress={this.submit} size="lg">
              Submit
            </Button>
          </FormControl>
        </VStack>
      </Box>
    );
  }
}

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId],
    goBack: () => navigation.goBack()
  }
}
export default connect(mapStateToProps)(AddCard);