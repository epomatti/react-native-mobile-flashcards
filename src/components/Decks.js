import React, { Component } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { Container, Text, VStack, Stack, Box, Divider, Center } from 'native-base';
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
      <ScrollView>
        {
          Object.keys(decks).map(key => (
            <TouchableOpacity key={key} onPress={() => this.toDeck(key)}>
              <VStack space="2.5" mt="4" px="8">
                <Stack direction="column" mb="2.5" mt="1.5" >
                  <Center w="100%" h="12" bg="primary.400" rounded="sm" _text={{
                    color: "warmGray.50",
                    fontWeight: "medium"
                  }} shadow={"3"}>
                    {key}
                  </Center>
                </Stack>
              </VStack>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
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