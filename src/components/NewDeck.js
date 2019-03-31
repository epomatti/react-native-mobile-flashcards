import React, { Component } from 'react'
import { Container, Button, Text, Input, Item, Content, Form } from 'native-base'
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
      <Container>
        <Content>
          <Form>
            <Item last>
              <Input
                onChangeText={(text) => this.setState({ title: text })}
                placeholder='Title'
                value={this.state.title}
              />
            </Item>
          </Form>
          <Button onPress={this.submit}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect()(NewDeck);