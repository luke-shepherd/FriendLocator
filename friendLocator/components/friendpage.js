
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
            data: [],
            reqsent: globals.pending.indexOf(globals.userpage),
            friendsent: globals.friendpending.indexOf(globals.userpage)
        }
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FFB266',
            },
            friendstext: {
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 5,
                marginTop: 10,
            },
            text: {
                fontSize: 40,
                textAlign: 'center',
                marginBottom: 20,
                marginTop: 100,
                color: '#222222',
            },
            listcontainer: {
                flex: 1,
                marginTop: 10,
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
                height: 180,
                width: 180,
                justifyContent: 'center',
                borderRadius: 180,
                backgroundColor: '#FFB266',
                marginTop: 10,
                marginBottom: 20,
            },

        });
    }

    buttonActionReq = () => {

        if (this.state.reqsent < 0) {
        
            var obj = globals.constructPacket({
                username: globals.user,
                friend: globals.userpage,
            })
            var url = globals.base_url + 'api/requestLocation'
            var success = globals.sendPacket(obj, url, () => {console.log('request location sent')})

            console.log('Request Button Pressed');

            this.setState({reqsent: 1})
        }
    
    }

    buttonActionSend = () => {

        console.log('Send Button Pressed');

    }

    buttonDeleteFriend = () => {
        console.log('Delete Friend!')
        var obj = globals.constructPacket({
                username: globals.user,
                friend: globals.userpage,
            })
            var url = globals.base_url + 'api/deleteFriend'
            var success = globals.sendPacket(obj, url, () => {console.log('friend request sent')})

            globals.friendslist.splice(globals.friendslist.indexOf(globals.userpage), 1)

            globals.routeTo('FriendPage')

            console.log('delete friend done');

    }

    buttonAddFriend = () => {
        if (this.state.friendsent < 0) {
        
            var obj = globals.constructPacket({
                username: globals.user,
                friend: globals.userpage,
            })
            var url = globals.base_url + 'api/addFriend'
            var success = globals.sendPacket(obj, url, () => {console.log('friend request sent')})

            console.log('Request Button Pressed');

            this.setState({friendsent: 1})
        }
    }

    buttonEndSession = () => {
        var obj = globals.constructPacket({
                username: globals.user,
                friend: globals.userpage,
            })
            var url = globals.base_url + 'api/deleteLocation'
            var success = globals.sendPacket(obj, url, () => {console.log('location request deleted')})

            globals.routeTo('FriendPage')

            console.log('End Session Button');
    }


    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    renderSendReq = function() {

        var found = false
        console.log("loooooooooooop")
        for(var i = 0; i < globals.friendlocs.length; i++) {
                console.log(globals.friendlocs[i].username)
                console.log('1')
                console.log(globals.userpage)
                console.log('2')
            if(globals.friendlocs[i].username == globals.userpage) {
                
                found = true
                break
            }
        }
        if(found) { 
            return (
                    <Button
                        onPress={this.buttonEndSession} 
                        title={'Stop Locating'}
                        color='#A9A9A9'
                    />
            )
        }

        if(globals.friendslist.indexOf(globals.userpage) > -1) { 
            if (this.state.reqsent > -1) {
                return (
                    <Button
                        onPress={this.buttonActionSend}
                        title={'Request Sent!'}
                        color='#A9A9A9'
                    />
                )
            } else {
                return (
                    <Button
                        onPress={this.buttonActionReq} 
                        title={'Request Location'}
                        color='#A9A9A9'
                    />
                )
            }   
        } else {
            if(this.state.friendsent < 0) {
                return (
                    <Button
                        onPress={this.buttonAddFriend} 
                        title={'+ Add Friend'}
                        color='#A9A9A9'
                    />
                )
            } else {
                return (
                    <Button
                        onPress={this.buttonActionSend}
                        title={'Request Sent!'}
                        color='#A9A9A9'
                    />
                )
            }
        }
    }

    renderDeleteFriend() {
        if(globals.friendslist.indexOf(globals.userpage) > -1) { 
            return (
                    <Button
                        onPress={this.buttonDeleteFriend} 
                        title={' Delete Friend'}
                        color='#A9A9A9'
                    />
            )
        }

    }

    render() {
        return (
                <View style={this.style.container}>
                    <Text style = {this.style.text}>
                        {globals.userpage}
                    </Text>
                    <Image style={this.style.circle}
                           source={require('./assets/stock_prof_pic.jpg')}/>
                    {this.renderSendReq()}  
                    {this.renderDeleteFriend()}
                    <Text style = {this.style.friendstext}>
                        {globals.friendslist.length == 0 ? 'No Friends :(' : 'Friends:'}
                    </Text>
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
                
                    <View style={this.style.navbar}>
                        <NavBar/>
                    </View>
                </View>
               );
    }

}
