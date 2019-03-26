import React, { Component } from 'react'
import { Container, Button, Text, Input, Item } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import * as Api from '../utils/api'

class NewDeck extends Component {
  state = {
    title: ''
  }
  submit = () => {
    const { dispatch } = this.props
    dispatch(addDeck(this.state))
    Api.submitDeck(this.state)
    this.toHome()
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'DeckList' }))
  }
  render() {
    return (
      <Container>
        <Text>What is the title of your new deck?</Text>
        <Item regular>
          <Input
            onChangeText={(text) => this.setState({ title: text })}
            placeholder='Title'
            value={this.state.title}
          />
        </Item>
        <Button onPress={this.submit}>
          <Text>Submit</Text>
        </Button>
      </Container>
    );
  }
}
function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(NewDeck);