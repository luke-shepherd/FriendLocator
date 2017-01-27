/**
 * Login Page for cs183 project
 * https://github.com/luke-shepherd/AdultFriendLocator
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class AllThingsLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    updateUsername = (text) => {
        this.setState((state) => {
            return {
                username: text,
                password: this.state.password,
            }
        });
    };

    updatePassword = (text) => {
        this.setState((state) => {
            return {
                username: this.state.username,
                password: text,
            }
        });
    };

    checkText = (text) => {
        /*only allow certain characters, word ban list, etc*/
        console.log('checking: ' + text)
    };

    loginUser = (text) => {
        /*send username, password to server*/
        console.log('logging in: ' + text)

        console.log('type: ')
        console.log(typeof this.state.username)

        var url = 'http://107.170.249.224:3000/test';
        /*var url = 'http://www.reddit.com/';*/

        var obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': 'adult',
                'pass': 'friends',
            })
        };

        let response = fetch(url, obj)
        .then((response) => response)
        .then((responseJson) => {
            console.log('response: ')
            console.log(responseJson);
        })
        .catch((error) => {
            console.log('error: ')
            console.log(error);
        });

    };

    render() {
        return (
            <View style={styles.logincontainer}>
                <Text style={styles.logintxt}>
                    Adults with Friends
                </Text>
                <TextInput 
                    style={styles.loginbox}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Enter Username!'
                    onChange={(event) => this.updateUsername(
                        event.nativeEvent.text
                    )}

                    onEndEditing={(event) => this.checkText(
                        event.nativeEvent.text
                    )}
                />
                <TextInput 
                    style={styles.loginbox}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Enter Password!'
                    onChange={(event) => this.updatePassword(
                        event.nativeEvent.text
                    )}

                    onEndEditing={(event) => this.checkText(
                        event.nativeEvent.text
                    )}

                    onSubmitEditing={(event) => this.loginUser(
                        event.nativeEvent.text
                    )}
                />
                <Text style={styles.logintxt}>
                    user: {this.state.username}{'\n'}
                    pass: {this.state.password}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
  logincontainer: {
    flex: 1, //allows flex usage for justification
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  loginbox: {
    height: 100,
  },
  logintxt: {
    fontSize: 50,
    textAlign: 'center',
    color: 'skyblue',
  },
});

AppRegistry.registerComponent('friendLocator', () => AllThingsLogin);

