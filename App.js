import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import AppNavigator from './components/AppNavigator'
import { Root } from 'native-base'
import { Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state
    return (
      <Provider store={createStore(reducer)}>
        <Root>
          {loading === false &&
            <AppNavigator />
          }
        </Root>
      </Provider>
    );
  }
}