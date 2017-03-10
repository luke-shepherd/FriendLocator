
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    Button,
    Switch
} from 'react-native';

globals = require('./globals')

export default class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            toggle: false,
            buttonTitle: 'Sign Up',
            actionText: '',
        }

        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            text: {
                fontSize: 35,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
            },
            inputbox: {
                height: 60,
                width: 300,
                fontSize: 20,
            },
            toggle: {
                marginBottom: 10,
                marginTop: 10,
            },
        });
    }

    buttonAction = () => {

        var text = this.state.toggle ? 'Logging in... ' : 'Signing up... '
        this.setState({actionText: text})

        var type = this.state.toggle ? 'signup' : 'login'
        var obj = globals.constructPacket(
            {username: this.state.username,
             pass: this.state.password,})

        var url = globals.base_url
        url = this.state.toggle ? url + 'api/login/' : url + 'registration'

        var success = globals.sendPacket(obj, url,
            () => {
                globals.user = this.state.username
                globals.routeTo('MapPage')
            })

    }

    //if they have data skil login page
    componentDidMount() {
        globals.load()
        if (globals.user) {
            console.log('[*] ' + globals.user + ' has persiting data')
            //var type = 'login'
            //var obj = globals.constructPacket(
            //    {username: globals.user,
            //     pass: globals.pass,})

            //var url = globals.base_url + 'api/login'
            //var success = globals.sendPacket(obj, url,
            //    () => {
            //        globals.routeTo('MapPage')
            //    })
            globals.routeTo('MapPage')
        }
        else {
            console.log('[*] no persisting data')
        }
    }


    render() {
        return (
            <View style={this.style.container}>
                <Text style={this.style.text}>
                    Login or Sign Up!
                </Text>

                <TextInput
                    style={this.style.inputbox}
                    placeholder='Enter Username'
                    onChangeText={(username) => this.setState({username})}
                />

                <TextInput
                    style={this.style.inputbox}
                    placeholder='Enter Password'
                    onChangeText={(password) => this.setState({password})}
                />

                <Switch
                    value={this.state.toggle}
                    style={this.style.toggle}
                    onValueChange={(value) => this.setState({toggle:value})}
                />

                <Button
                    onPress={this.buttonAction}
                    title={this.state.toggle ? 'Log In' : 'Sign Up'}
                    color='#841584'
                />
            </View>
        );
    }

}


/*
<Text style={this.style.text}>
                    {this.state.actionText}
                </Text>

                <Text style={this.style.text}>
                    User: {this.state.username}{'\n'}
                    Pass: {this.state.password}{'\n'}
                    toggle: {this.state.toggle ? 'True' : 'False'}
                </Text>
*/

