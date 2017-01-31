
import React, { Component } from 'react';

import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TestPage from './testpage.js';
import SignInPage from './signinpage.js';
import MapPage from './mappage.js';

export default class Main extends Component {
    renderScene(route, navigator) {
        switch(route.id) {
            case 'SignInPage':  return (<SignInPage nav={navigator}/>);
            case 'TestPage':    return (<TestPage nav={navigator}/>);
            case 'MapPage':    return (<MapPage nav={navigator}/>);
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'SignInPage'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
  }
}

AppRegistry.registerComponent('friendLocator', () => Main);

