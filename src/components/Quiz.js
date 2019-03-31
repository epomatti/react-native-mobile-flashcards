import React, { Component } from 'react';
import { Container, Button, Item, Input, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import * as Api from '../utils/api'

class AddCard extends Component {
  state = {
    current: 0,
    total: 0,
    screen: 'front',
    corrects: 0
  }
  Front = () => {
    const { cards } = this.props.deck
    const { current, total } = this.state
    return (
      <Container>
        <Text>{`${current + 1}/${total}`}</Text>
        <Text>{cards[current].question}</Text>
        <Text>{cards[current].answer}</Text>
        <Button success onPress={() => this.answer(true)}>
          <Text>Correct</Text>
        </Button>
        <Button danger onPress={() => this.answer(false)}>
          <Text>Incorrect</Text>
        </Button>
      </Container>
    )
  }
  Back = () => {
    const { cards } = this.props.deck
    const { current, total } = this.state
    return (
      <Container>
        <Text>{`${current + 1}/${total}`}</Text>
        <Text>{cards[current].question}</Text>
        <Text>{cards[current].answer}</Text>
        {this.hasNext() === true &&
          <Button onPress={() => this.next()}>
            <Text>Next</Text>
          </Button>
        }
        {this.hasNext() === false &&
          <Button onPress={() => this.setState({ screen: 'score' })}>
            <Text>Finish</Text>
          </Button>
        }
      </Container>
    )
  }
  hasNext = () => {
    const { total, current } = this.state
    console.log(this.state)
    return total > current + 1
  }
  Score = () => {
    const { total, corrects } = this.state
    const percent = (100 / total) * corrects
    return (
      <Container>
        <Text>{`You correctly answer a total of ${corrects} out of ${total} questions`}</Text>
        <Text>{`Your success percentage was: ${percent} %`}</Text>
      </Container>
    )
  }
  next = () => {
    this.setState(
      {
        current: this.state.current + 1,
        screen: 'front'
      }
    )
  }
  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }
  answer = (answer) => {
    if (answer) {
      this.setState(
        {
          screen: 'back',
          corrects: this.state.corrects + 1
        }
      )
    } else {
      this.setState(
        {
          screen: 'back'
        }
      )
    }
  }
  componentDidMount() {
    const { cards } = this.props.deck
    this.setState({ total: cards.length })
  }
  render() {
    const { screen } = this.state
    if (screen === 'front') {
      return <this.Front />
    } else if (screen === 'back') {
      return <this.Back />
    } else if (screen === 'score') {
      return <this.Score />
    }
  }
}
function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deck: decks[deckId]
  }
}
export default connect(mapStateToProps)(AddCard);