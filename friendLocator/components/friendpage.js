
import React, { Component } from 'react';
import {
    StyleSheet,
        Text,
        View,
        Navigator,
        Button
} from 'react-native';

globals = require('./globals')

export default class FriendPage extends Component {
    
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

    render() {
        return (
                <View style={this.style.container}>
                    <Text style={this.style.text}>
                        Page
                    </Text>
                    <Button
                        onPress={this.buttonActionReq} 
                        title={'Request Location'}
                        color='#841584'
                    />
                     <Button
                        onPress={this.buttonActionSend}
                        title={'Send Location'}
                        color='#841584'
                    />
                </View>
               );
    }

}
