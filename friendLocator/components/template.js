
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

globals = require('./globals')

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            text: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
            },
        });
    }

    render() {
        return (
            <View style={this.style.container}>
                <Text style={this.style.text}>
                    Template Page
                </Text>
            </View>
        );
    }

}

