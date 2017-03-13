
import React, { Component } from 'react';
import {
    StyleSheet,
        Text,
        View,
        Navigator,
        Button,
        Image,
        ListView,
        TouchableHighlight,
} from 'react-native';

import NavBar from './navbar.js';
globals = require('./globals')


export default class UserPage extends Component {
    
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1 !== r2}
        );
        this.state = {
            data: ['friend1', 'friend2'],
        }
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            text: {
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 20,
                marginTop: 100,
            },
            listcontainer: {
                flex: 1,
            },
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            rowtext: {
                fontSize: 15,
                textAlign: 'center',
                marginTop: 5,
                marginBottom: 5,
            },
            navbar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            },
            circle: {
                height: 200,
                width: 200,
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#F5FCFF',
                marginTop: 30,
                marginBottom: 20,
            },

        });
    }

    buttonActionReq = () => {
        
        var obj = globals.constructPacket({
            username: globals.user,
            friend: globals.userpage,
        })
        var url = globals.base_url + 'api/requestLocation'
        var success = globals.sendPacket(obj, url, () => {console.log('request location sent')})

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

    renderSendReq = function() {
        return (
            <View>
                <Button
                    onPress={this.buttonActionSend}
                    title={'Send Location'}
                    color='#808080'
                />
                <Button
                    onPress={this.buttonActionReq} 
                    title={'Request Location'}
                    color='#A9A9A9'
                />
            </View>)
    }

    render() {
        return (
                <View style={this.style.container}>
                    <Text style = {this.style.text}>
                        {globals.userpage}
                    </Text>
                    <Image style={this.style.circle}
                           source={require('./assets/stock_prof_pic.jpg')}/>

                    <View style={this.style.listcontainer}>
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.data)}
                            renderRow={(row) => 
                                <View style={this.style.row}>
                                    <TouchableHighlight 
                                        onPress={() => this.highlightAction(row)}
                                        underlayColor='#dcdcdc'>
                                        <Text style={this.style.rowtext}>
                                            {row}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            }
                            enableEmptySections={true}
                        />
                    </View>
                    
                     <Button
                        onPress={this.buttonActionSend}
                        title={'Send Location'}
                        color='#841584'
                    />    
                
                    <View style={this.style.navbar}>
                            <NavBar/>
                    </View>
                </View>
               );
    }

}
