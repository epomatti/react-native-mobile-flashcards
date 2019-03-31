import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Button, Text, Card, CardItem, Body } from 'native-base'
import { connect } from 'react-redux'
import { retrieveDecks } from '../actions';
import * as Api from '../utils/api'
import { clearLocalNotifications, setLocalNotification } from '../utils/notification'

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    const { dispatch } = this.props
    Api.fetchDecks()
      .then(decks => dispatch(retrieveDecks(decks)))
      .then(this.setState({ ready: true }))
    if (this.playedToday() === false) {
      clearLocalNotifications().then(() => {
        setLocalNotification()
      })
    }
  }
  playedToday = () => {
    const { plays } = this.props
    return Object.values(plays).filter(play => {
      const today = new Date()
      const day = new Date(play.timestamp)
      return today.getFullYear() === day.getFullYear()
        && today.getMonth() === day.getMonth()
        && today.getDay() === day.getDay()
    }).length > 0
  }
  toDeck = (key) => {
    this.props.navigation.navigate('Deck', { deckId: key }
    )
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <Container><Text>Loading decks</Text></Container>
    }
    return (
      <Container>
        {
          Object.keys(decks).map(key => (
            <TouchableOpacity key={key} onPress={() => this.toDeck(key)}>
              <Card >
                <CardItem header>
                  <Text>{key}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{decks[key].cards.length} cards</Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))
        }
      </Container>
    )

  }
}
function mapStateToProps({ decks, plays }) {
  return {
    decks,
    plays
  }
}

export default connect(mapStateToProps)(Decks);