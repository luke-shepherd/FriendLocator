
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

const logOut = () => {
    globals.user = '';
    globals.token = '';

    //app user info
    globals.pass = '';
    globals.friendslist = [];
    globals.dump()

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

    leftAction() {
        console.log('[+] navbar: left')
        page = globals.nav.getCurrentRoutes()[0].id
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

    rightAction() {
        console.log('[+] navbar: right')
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

