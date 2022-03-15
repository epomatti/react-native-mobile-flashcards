import React, { Component, Fragment } from 'react';
import { Button, Text, Box, Stack, Center, Divider, Progress } from 'native-base'
import { connect } from 'react-redux'
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
      <Box>
        <Stack space="2.5" mt="4" px="8">
          <Text key="totalFront">{`Total: ${current + 1}/${total}`}</Text>
          <Divider></Divider>
          <Center>
            <Text mt="3" bold fontSize="2xl">{cards[current].question}</Text>
            <Text fontSize="2xl">{answerPlaceholder}</Text>
          </Center>
          {showAnswer === false &&
            <Button key="btnShow" mt="3" success onPress={() => this.showAnswer()}>
              Show the Answer
            </Button>
          }
          {showAnswer === true &&
            <Fragment>
              <Button key="btnCorrect" mt="3" colorScheme="success" onPress={() => this.answer(true)}>
                Correct
              </Button>
              <Button key="btnIncorrect" colorScheme="error" onPress={() => this.answer(false)}>
                Incorrect
              </Button>
            </Fragment>
          }
        </Stack>
      </Box>
    )
  }
  showAnswer = () => {
    const { cards } = this.props.deck
    const { current } = this.state
    console.log(this.state)
    this.setState({
      answerPlaceholder: cards[current].answer,
      showAnswer: true
    })
  }
  Back = () => {
    const { cards } = this.props.deck
    const { current, total } = this.state
    return (
      <Box>
        <Stack space="2.5" mt="4" px="8">
          <Text key="totalBack">{`${current + 1}/${total}`}</Text>
          <Divider></Divider>
          <Center>
            <Text mt="3" bold fontSize="2xl">{cards[current].question}</Text>
            <Text fontSize="2xl">{cards[current].answer}</Text>
          </Center>
          {this.hasNext() === true &&
            <Button key="btnNext" mt="3" onPress={() => this.next()}>
              Next
            </Button>
          }
          {this.hasNext() === false &&
            <Button key="btnFinish" mt="3" onPress={() => this.setState({ screen: 'score' })}>
              Finish
            </Button>
          }
        </Stack>
      </Box>
    )
  }
  hasNext = () => {
    const { total, current } = this.state
    console.log(this.state)
    return total > current + 1
  }
  progressColor = (percentage) => {
    console.log(percentage);
    if (percentage <= 50) {
      return "danger"
    } else if (percentage <= 70) {
      return "primary"
    } else {
      return "success"
    }
  }
  Score = () => {
    const { cards } = this.props.deck
    const { goBack } = this.props
    const { total, corrects } = this.state
    const percent = (100 / total) * corrects
    clearLocalNotifications()
    return (
      <Box>
        <Stack space="2.5" mt="4" px="8">
          <Center>
            <Text bold fontSize="2xl">Results</Text>
            <Divider></Divider>
            <Text key="totalResults" mt="3" fontSize="md">{`You correctly answered ${corrects} out of ${total} questions`}</Text>
            <Text fontSize="md">{'Your success percentage was:'}</Text>
            <Text mt="4" fontSize="2xl">{`${percent} %`}</Text>
          </Center>
          <Center w="100%">
            <Box w="60%" maxW="250">
              <Progress size="2xl" colorScheme={this.progressColor(percent)} mb={6} value={percent} />
            </Box>
          </Center>
          <Button key="btnRestart" onPress={() => this.setState({
            current: 0,
            total: cards.length,
            screen: 'front',
            corrects: 0,
            showAnswer: false,
            answerPlaceholder: '???'
          })}>
            Restart Quiz
          </Button>
          <Button key="btnBackDeck" colorScheme="secondary" onPress={() => goBack()}>
            Back to Deck
          </Button>
        </Stack>
      </Box>
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