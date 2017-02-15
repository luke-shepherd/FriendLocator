
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

//http://stackoverflow.com/questions/33117227/setting-environment-variable-in-react-native

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
                initialRoute={{id: 'TestPage'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
  }
}

AppRegistry.registerComponent('friendLocator', () => Main);

