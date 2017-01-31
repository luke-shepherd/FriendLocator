/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TestPage from './testpage.js';

export default class Main extends Component {
  render() {
    return (
        <TestPage />
    );
  }
}

AppRegistry.registerComponent('friendLocator', () => Main);
