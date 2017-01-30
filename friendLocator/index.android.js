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
  Button,
  View,
  Navigator
} from 'react-native';

export default class MainApp extends Component {
    /* creates state object on initialization */
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    /* called on each character press, logs username in state*/
    updateUsername = (text) => {
        this.setState((state) => {
            return {
                username: text,
                password: this.state.password,
            }
        });
    };

    /* called on each character press, logs password in state*/
    updatePassword = (text) => {
        this.setState((state) => {
            return {
                username: this.state.username,
                password: text,
            }
        });
    };

    /*only allow certain characters, word ban list, etc, etc*/
    checkText = (text) => {
        console.log('[*] checkText(): ' + text)
    };

    /*send username, password to server*/
    loginUser = (text, route, routes) => {
        console.log('[*] loginUser(): ' + this.state.username 
                + ', ' + this.state.password)

        /* DEBUG: always successful */
        console.log('[+] login: successful')
        return true

        /* 
        var url = 'http://107.170.249.224:3000/test';

        var obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user': this.state.username,
                'pass': this.state.password,
            })
        };

        let response = fetch(url, obj)
        .then((response) => response)
        .then((responseJson) => {
            console.log('[*] response: ')
            console.log(responseJson);
            if (false) {
                console.log('[+] login: success')
                return true
            }
            else {
                console.log('[-] login: failure')
                return false
            }
        })
        .catch((error) => {
            console.log('[*] error: ')
            console.log(error);
        });
        */

    };

    /* render a page stack */
    render() {
        const routes = [
            {title: 'loginpage', index: 0},
            {title: 'mappage', index: 1},
        ];
        return (
            /*  page stack, controls what page is rendered */
            <Navigator
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={(route, navigator) =>

                /* a container to use with flex */
                <View style={styles.logincontainer}>
                    
                    {/* simple text title */}
                    <Text style={styles.logintxt}>
                        Adults with Friends
                    </Text>
                    
                    {/* field so user can enter username */}
                    <TextInput 
                        style={styles.loginbox}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Enter Username!'
                        /* event called on character press */
                        onChange={(event) => this.updateUsername(
                            event.nativeEvent.text
                        )}
                        /* event called when exiting the box */
                        onEndEditing={(event) => this.checkText(
                            event.nativeEvent.text
                        )}
                    />
                    
                    {/* field so user can enter password */}
                    <TextInput 
                        style={styles.loginbox}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='Enter Password!'
                        /* event called on character press */
                        onChange={(event) => this.updatePassword(
                            event.nativeEvent.text
                        )}
                        /* event called when exiting the box */
                        /* FIXME: onEnd not called here due to user never
                                  leaving the box, just goes directly 
                                  to onSubmit  */
                        onEndEditing={(event) => this.checkText(
                            event.nativeEvent.text
                        )}
                        /* event called when user hits enter */
                        onSubmitEditing={(event) => {
                            /* push next page onto stack on login success */
                            if (this.loginUser(event.nativeEvent.text)) {
                                console.log('[+] rendering next page')
                                if (route.index == 0) {
                                    navigator.push(routes[1])
                                }
                            }

                        }}
                    />

                    {/* quick button for submit */}
                    <Button
                        onPress={(event) => {
                            /* push next page onto stack on login success */
                            if (this.loginUser(event.nativeEvent.text)) {
                                console.log('[+] rendering next page')
                                if (route.index == 0) {
                                    navigator.push(routes[1])
                                }
                            }
                        }}
                        title='login'
                        color='skyblue'
                    />

                    {/* displays current state as text for debug */}
                    <Text style={styles.logintxt}>
                        user: {this.state.username}{'\n'}
                        pass: {this.state.password}
                    </Text>
                </View>
            }/>
        );
    }

}

/* css stylesheet object */
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

/* register the main class; the app name and key below must be the same */
AppRegistry.registerComponent('friendLocator', () => MainApp);

