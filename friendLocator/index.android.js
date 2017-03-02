
import React, { Component } from 'react';

import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    View
} from 'react-native';

import TestPage from './components/testpage.js';
import SignInPage from './components/signinpage.js';
import MapPage from './components/mappage.js';
import NotifPage from './components/notifpage.js';
globals = require('./components/globals')

export default class Main extends Component {
    renderScene(route, navigator) {
        globals.nav = navigator
        switch(route.id) {
            case 'SignInPage':  return (<SignInPage nav={navigator}/>);
            case 'TestPage':    return (<TestPage nav={navigator}/>);
            case 'MapPage':    return (<MapPage nav={navigator}/>);
            case 'NotifPage':    return (<NotifPage nav={navigator}/>);
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

