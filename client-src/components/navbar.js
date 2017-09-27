/* navbar.js 
    
    Code for navigation bar component. Navigation bar is used to navigate different
    pages in the app like map page, profile page, etc.

    written by Kyle Danna and Luke Shepherd
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator, 
    Image
} from 'react-native';

globals = require('./globals')


/*  Called when user presses "log out" button. 
    resets global vars to default and navigate
    to sign in page

    must be const and outside component object
*/ 
const logOut = () => {
    globals.user = '';
    globals.token = '';

    //app user info
    globals.pass = '';
    globals.friendslist = [];
    globals.dump()

    for (var i = 0; i < globals.intervals.length; i++) {
        clearInterval(globals.intervals[i])
    }
    globals.intervals = []

    setTimeout ( () => {
        globals.routeTo('SignInPage')
    }, 500)

    
}

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.leftkarat = '<    '
        this.logtxt = 'log  '
        this.outtxt = 'out  '
        this.notifblank = '   '

        //component style sheet
        this.style = StyleSheet.create({
            container: {
                //flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'black',
                //width: 40,
                height: 60,
            },
            leftfriend: {
                fontSize: 15,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                marginLeft: 10,
            },
            leftbutton: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                marginLeft: 20,
            },
            menuicon: {
                marginLeft: 20,
                height: 40,
                width: 40,
            },
            earthicon: {
                marginLeft: 12,
                marginRight: 10,
                height: 20,
                width: 20,
            },
            rightbutton: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                marginRight: 20,
            },
            logout: {
                fontSize: 15,
                textAlign: 'center',
                marginRight: 10,
                color: '#F5FCFF',
                marginLeft: 20,
            },
            titletext: {
                fontSize: 15,
                //flex: .5,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                fontStyle: 'italic',
                fontWeight: 'bold',
            },
        });
    }

    /* called when left navigation button is pressed */
    leftAction() {
        //console.log('[+] navbar: left')
        page = globals.nav.getCurrentRoutes()[0].id

        //switch to different pages depending on current page
        switch (page) {
            case 'MapPage':
                globals.routeTo('UserPage')
                break
            case 'NotifPage':
                globals.routeTo('MapPage')
                break
            case 'UserPage':
                logOut()
                break

            default:
                globals.routeTo('MapPage')
                break
        }
    }

    /* called when right navigation button is pressed */
    rightAction() {
        //console.log('[+] navbar: right')

        //switch to different pages depending on current page
        page = globals.nav.getCurrentRoutes()[0].id
        switch (page) {
            case 'MapPage':
                globals.routeTo('NotifPage')
                break
            case 'UserPage':
                globals.routeTo('MapPage')
                break
            default:
                break
        }
    }

    //function specifies how left navigation button is rendered. 
    // depending on page, will be rendered with a karat, "log out", or 
    // a menu icon
    renderLeft = () => {
        page = globals.nav.getCurrentRoutes()[0].id
        switch (page) {
            case 'UserPage':
                return ( <TouchableHighlight 
                    onPress={() => this.leftAction()}
                    underlayColor='#2f2f2f'
                >
                    <View>
                        <Text style={this.style.logout}>
                            {this.logtxt}  
                        </Text>
                        <Text style={this.style.logout}>
                            {this.outtxt}  
                        </Text>
                    </View>
                </TouchableHighlight>)
                break
            case 'FriendPage':
                return ( <TouchableHighlight 
                    onPress={() => this.leftAction()}
                    underlayColor='#2f2f2f'
                >
                    <Text style={this.style.leftfriend}>
                        &lt; map
                    </Text>
                </TouchableHighlight>) 
                break
            case 'MapPage':
                return ( <TouchableHighlight 
                    onPress={() => this.leftAction()}>
                    <Image
                        style={this.style.menuicon}
                        source={require('./assets/whitemenu.png')}
                    />
                </TouchableHighlight>) 
                break
            default:
                return ( <TouchableHighlight 
                    onPress={() => this.leftAction()}
                    underlayColor='#2f2f2f'
                >
                    <Text style={this.style.leftbutton}>
                        {this.leftkarat}
                    </Text>
                </TouchableHighlight>)
                break
        }
    }

    //function specifies how right navigation button is rendered. 
    // depending on page, will be rendered with a karat, notif icon, or 
    // a blank space
    renderRight = () => {
        page = globals.nav.getCurrentRoutes()[0].id
        switch (page) {
            case 'MapPage':
                return ( <TouchableHighlight 
                    onPress={() => this.rightAction()}>
                    <Image
                        style={this.style.earthicon}
                        source={require('./assets/earth.png')}
                    />
                </TouchableHighlight>) 
                break
            case 'NotifPage':
                return (<TouchableHighlight 
                    onPress={() => this.rightAction()}
                    underlayColor='#2f2f2f'>
                    <Text style={this.style.rightbutton}>
                        {this.notifblank}
                    </Text>
                </TouchableHighlight>)
                break

            case 'FriendPage':
                return (<TouchableHighlight 
                    onPress={() => this.rightAction()}
                    underlayColor='#2f2f2f'>
                    <Text style={this.style.rightbutton}>
                        {this.notifblank}
                    </Text>
                </TouchableHighlight>)
                break

            default: 
                return (
                <TouchableHighlight 
                    onPress={() => this.rightAction()}
                    underlayColor='#2f2f2f'>
                    <Text style={this.style.rightbutton}>
                        &gt;
                    </Text>
                </TouchableHighlight>)
                break
        }
    }

    // Render function for navigation bar
    //Allows for dynamic style page selection
    render() {
        return (
            <View style={this.style.container}>
                {this.renderLeft()}
                <Text style={this.style.titletext}>
                    friendLocator
                </Text>

                {this.renderRight()}
            </View>
        );
    }

}

