import React, { Component, Fragment } from 'react';
import { Container, Button, Item, Input, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import * as Api from '../utils/api'
import { clearLocalNotifications } from '../utils/notification'

class AddCard extends Component {
  state = {
    current: 0,
    total: 0,
    screen: 'front',
    corrects: 0,
    showAnswer: false,
    answerPlaceholder: '???'
  }
  Front = () => {
    const { cards } = this.props.deck
    const { current, total, showAnswer, answerPlaceholder } = this.state
    return (
      <Container>
        <Text>{`${current + 1}/${total}`}</Text>
        <Text>{cards[current].question}</Text>
        <Text>{answerPlaceholder}</Text>
        {showAnswer === false &&
          <Button success onPress={() => this.showAnswer()}>
            <Text>Show the Answer</Text>
          </Button>
        }
        {showAnswer === true &&
          <Fragment>
            <Button success onPress={() => this.answer(true)}>
              <Text>Correct</Text>
            </Button>
            <Button danger onPress={() => this.answer(false)}>
              <Text>Incorrect</Text>
            </Button>
          </Fragment>
        }
      </Container>
    )
  }
  showAnswer = () => {
    const { cards } = this.props.deck
    const { current } = this.state
    this.setState({
      answerPlaceholder: cards[current].answer,
      showAnswer: true
    })
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
    const { cards } = this.props.deck
    const { goBack } = this.props
    const { total, corrects } = this.state
    const percent = (100 / total) * corrects
    clearLocalNotifications()
    return (
      <Container>
        <Text>{`You correctly answer a total of ${corrects} out of ${total} questions`}</Text>
        <Text>{`Your success percentage was: ${percent} %`}</Text>
        <Button onPress={() => this.setState({
          current: 0,
          total: cards.length,
          screen: 'front',
          corrects: 0,
          showAnswer: false,
          answerPlaceholder: '???'
        })}>
          <Text>Restart Quiz</Text>
        </Button>
        <Button onPress={() => goBack()}>
          <Text>Back to Deck</Text>
        </Button>
      </Container>
    )
  }
  next = () => {
    this.setState(
      {
        current: this.state.current + 1,
        screen: 'front',
        answerPlaceholder: '???',
        showAnswer: false
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
    deck: decks[deckId],
    goBack: () => navigation.goBack()
  }
}
export default connect(mapStateToProps)(AddCard);