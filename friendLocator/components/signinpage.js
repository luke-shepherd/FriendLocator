
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

    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    sendPacket(obj) {
        var url = 'http://107.170.249.224:3000/'
        url = this.state.toggle ? url + 'signin' : url + 'registration'
        let response = fetch(url, obj)
            .then((response) => response.json())
            .then((resonseJson) => {
                console.log(responseJson)
                //read into json object and parse

                /*
                    body: {
                        type: 'response',
                        success: true,
                        reason: 'could not find username'
                    }
                */

                if (false) return true
                return false
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    }

    constructPacket() {
        var obj = {
            method: 'POST',
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                type: (this.state.toggle ? 'signup' : 'login'),
                user: this.state.username,
                pass: this.state.password,
            })
        }
        return obj
    }

    buttonAction = () => {
        var text = this.state.toggle ? 'Logging in... ' : 'Signing up... '
        this.setState({actionText: text})

        var obj = this.constructPacket()
        var success = this.sendPacket(obj)

        if (success) {
            this.routeTo('MapPage')
        }

        //DEBUG
        //success = this.state.username == 'true' ? true: false

        //simulate sending packet and recieving response
        /*
        setTimeout( () => {
            var result = success ? ' Success!': 'Failure.'
            this.setState({actionText: this.state.actionText + result})
            if (success) {
                setTimeout( () => {
                    this.routeTo('MapPage')
                }, 1000)
            }
        }, 2000)
        */
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

                <Text style={this.style.text}>
                    {this.state.actionText}
                </Text>

                <Text style={this.style.text}>
                    User: {this.state.username}{'\n'}
                    Pass: {this.state.password}{'\n'}
                    toggle: {this.state.toggle ? 'True' : 'False'}
                </Text>

            </View>
        );
    }

}

