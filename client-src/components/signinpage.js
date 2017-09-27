/*  mappage.js
    
    Code for map component. As implemented only works on Android, 
    but will still build on iOS. 
    

    written by Kyle Danna with contributions by Luke Shepherd
*/

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
            renderToggle: false,
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
            tryagaintext: {
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
                color: 'red'
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

    // Same button for signing up or logging in
    // a toggle is used to specify which the user would like to do

    // Routes to map page if successful 
    buttonAction = () => {

        setTimeout( () => {
        if (globals.nav.getCurrentRoutes()[0].id == 'SignInPage' && this.state.toggle) {
            var text = 'Incorrect Username or Password ;('
            this.setState({actionText: text})
        }}, 1500)

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

    //if they have data skip login page
    componentDidMount() {
        globals.load()
        setTimeout ( () => {
            if (!this.state.renderToggle) {
                if (globals.user) {
                    //console.log('[*] ' + globals.user + ' has persiting data')
                    globals.routeTo('MapPage')
                }
                else {
                    //console.log('[*] no persisting data')
                    this.setState({renderToggle: true})
                }
            }
        }, globals.loginwait)
 
    }

    //Render function dynaically renders either a login or sign up button
    render() {
        if (this.state.renderToggle) {
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
                        secureTextEntry={true}
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
                    <Text style={this.style.tryagaintext}>
                        {this.state.actionText}
                    </Text>
                </View>
            );
        }
        else {
            return (
                 <View style={this.style.container}>
                    
                </View>
            );
        }
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

