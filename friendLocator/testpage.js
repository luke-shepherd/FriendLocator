
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class TestPage extends Component {
    
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            }}>
                <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    margin: 10,
                }}>
                    Something you did worked!
                </Text>
            </View>
        );
    }

}

