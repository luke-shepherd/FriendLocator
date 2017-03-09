
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator
} from 'react-native';

globals = require('./globals')

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'black',
                //width: 40,
                height: 60,
            },
            leftbutton: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                marginLeft: 20,
            },
            rightbutton: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
                color: '#F5FCFF',
                marginRight: 20,
            },
            titletext: {
                fontSize: 23,
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
            default:
                globals.routeTo('MapPage')
                break
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <TouchableHighlight 
                    onPress={() => this.leftAction()}
                    underlayColor='#2f2f2f'
                >
                    <Text style={this.style.leftbutton}>
                        Left
                    </Text>
                </TouchableHighlight>
                
                <Text style={this.style.titletext}>
                    friendLocator
                </Text>

                <TouchableHighlight 
                    onPress={() => this.rightAction()}
                    underlayColor='#2f2f2f'
                >
                    <Text style={this.style.rightbutton}>
                        Right
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

}

