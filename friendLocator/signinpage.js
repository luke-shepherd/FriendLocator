
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

export default class SignInPage extends Component {
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

    /* called on initialization 
        debug function routes to testpage after 3 seconds 
     */
    componentWillMount() {
        setTimeout(() => {
            this.props.nav.replace({
                id: 'TestPage',
            });
        }, 3000);
    }
    
    render() {
        return (
            <View style={this.style.container}>
                <Text style={this.style.text}>
                    Testing routing from the login page.
                </Text>
            </View>
        );
    }

}

