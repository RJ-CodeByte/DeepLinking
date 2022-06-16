
import React, { Component } from 'react'

import Routes from './src/navigations/Routes';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import { Linking } from 'react-native';
import navigationService from './src/navigations/navigationService';
import navigationStrings from './src/constants/navigationStrings';



export default class App extends Component {

  componentDidMount() {
    Linking.addEventListener('url', this.handleUrl);
    Linking.getInitialURL().then((url) => {
      console.log('url', url)
      if (url) {
        let getId = url.split('/').pop()
        console.log('getId', getId)
        setTimeout(() => {
          navigationService.navigate(navigationStrings.Profile, { uid: getId })
        }, 1000)
      }
    }).catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeAllListeners('url', this.handleUrl);
  }

  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        let getId = url.split('/').pop()
        console.log('getId', getId)
        setTimeout(() => {
          navigationService.navigate(navigationStrings.Profile, { uid: getId })
        }, 1000)
        // console.log(url);
      }
    });

  }



  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    )
  }
}