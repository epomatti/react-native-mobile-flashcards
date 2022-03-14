import React, { Component } from 'react'
import { Container, Button, Input, FormControl, Box, Stack } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import * as Api from '../utils/api'

class NewDeck extends Component {
  state = {
    title: '',
    cards: []
  }
  submit = () => {
    const { dispatch } = this.props
    Api.submitDeck(this.state)
      .then(dispatch(addDeck(this.state)))
    this.toHome()
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Decks' }))
  }
  render() {
    return (
        <Box>
          <Stack space="2.5" mt="4" px="8">
            <FormControl>
              <Input
                onChangeText={(text) => this.setState({ title: text })}
                placeholder='Title'
                value={this.state.title}
                size="lg"
              />
            </FormControl>
            <Button onPress={this.submit} size="lg">
              Submit
            </Button>
          </Stack>
        </Box>
    );
  }
}

export default connect()(NewDeck);