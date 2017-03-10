
import React, { Component } from 'react';
import {
    StyleSheet,
        Text,
        View,
        Navigator,
        Button,
        Image,
} from 'react-native';

import NavBar from './navbar.js';
globals = require('./globals')


export default class UserPage extends Component {
    
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
            navbar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            },
            circle: {
                height: 100,
                width: 100,
                borderRadius: 30,
                backgroundColor: '#F5FCFF',
                marginBottom: 10,
            },

        });
    }

    buttonActionReq = () => {
        /*
        var obj = globals.constructPacket()
        var success = globals.sendPacket(obj)

        if (success) {
            //do something
        }
    */
        console.log('Request Button Pressed');
    
    }

    buttonActionSend = () => {

        /*
        var obj = globals.constructPacket()
        var success = globals.sendPacket(obj)

        if (success) {
            //do something
        } */

        console.log('Send Button Pressed');
    }


    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    renderSend = function() {
        return (
            <Button
                onPress={this.buttonActionSend}
                title={'Send Location'}
                color='#841584'
            />)
    }

    render() {
        return (
                <View style={this.style.container}>
                    <Text style={globals.userpage}>
                        Page
                    </Text>
                    <View style={this.style.navbar}>
                        <NavBar/>
                    </View>
                    <Image style={this.style.circle}
                        source={require('./assets/stock_prof_pic.jpg')}/>
                    <Button
                        style={this.style.requestButton}
                        onPress={this.buttonActionReq} 
                        title={'Request Location'}
                        color='#841584'
                    />
                    {this.renderSend()}
                </View>
               );
    }

}
