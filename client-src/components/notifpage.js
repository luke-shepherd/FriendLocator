/* navbar.js 
    
    Code for navigation bar component. Navigation bar is used to navigate different
    pages in the app like map page, profile page, etc.

    written by Kyle Danna with contributions from Luke Shepherd
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Button,
    Navigator
} from 'react-native';

import NavBar from './navbar.js';
globals = require('./globals')

export default class NotifPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1 !== r2}
        )
        this.state = {
            notifications: globals.notifications,
            requests: globals.requests,

            noNotifText: 'no notifications  ;(',
            notifTitleText: 'Notifications',
            noMessage: '',
            locationRequestMessage: ' has requested your location',
            friendRequestMessage: ' has requested your friendship',
        }

        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            pagecontainer: {
                flex: 1,
                top: 70,
                alignItems: 'center',
                //width: 600,
            },
            row: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                //alignItems: 'center',
            },
            okbutton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            rowtext: {
                fontSize: 16,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
                //color: 'grey',
            },
            navbar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            },
            noNotifText: {
                flex:1,
                position: 'absolute',
                top: 300,
                left: 100,
                fontSize: 20,
            },
            titleText: {
                //flex:1,
                //position: 'absolute',
                //top: 300,
                //left: 100,
                fontSize: 30,
                color: 'black',
            },
            divider: {
                flex: 1,
                marginTop: 20,
                height: 3,
                width: 999999,
                backgroundColor: 'black',
            }
        });
    }

    componentDidMount() {
        //do nothing special
    }

    highlightAction(notif) {
        //console.log('[*] pressed: ' + notif)
        //if (this.state.notifications.indexOf(notif) > -1) {
        //    //if its a notification, remove row from list
        //    var index = globals.notifications.indexOf(notif)
        //    globals.notifications.splice(index, 1)
        //    this.setState({notifications: globals.notifications})
        //}
        //else do nothing
    }

/*
    Called for "accept" and "decline" button press on notification page
    handles presses for "accept" and "decline" buttons for location sharing requests

    notif specifies which specific notification in the list is selected
    action specifies which button was pressed, either "accept" or "decline"
*/ 
    buttonAction(notif, action) {
        //respond to the request

        //decline either friend request or location request
        if (action == 'decline') {

            //remove row from list
            var index = globals.requests.indexOf(notif)
            globals.requests.splice(index, 1)
            this.setState({requests: globals.requests})

            if (globals.friend_requests.indexOf(notif) > -1) {

                var url = globals.base_url + 'api/declineFriend'
                var obj = globals.constructPacket({username: globals.user, friend: notif})
                var success = globals.sendPacket(obj, url, 
                    () => {
                        console.log('[+] success declined friend: ' + notif)
                    })
            }
            else {
                //this is decline location request
                var url = globals.base_url + 'api/declineLocation'
                var obj = globals.constructPacket({username: globals.user, friend: notif})
                var success = globals.sendPacket(obj, url, 
                    () => {
                        console.log('[+] success location accept: ' + notif)
                    })
            }
        }
        //accept either friend request or location request
        else { //action == 'accept'

            //remove row from notification list
            var index = globals.requests.indexOf(notif)
            globals.requests.splice(index, 1)
            this.setState({requests: globals.requests})


            if (globals.friend_requests.indexOf(notif) > -1) {
                var url = globals.base_url + 'api/acceptFriend'
                var obj = globals.constructPacket({username: globals.user, friend: notif})
                var success = globals.sendPacket(obj, url, 
                    () => {
                        console.log('[+] success accepted friend: ' + notif)
                        globals.friendslist.append(notif)
                    })
            }
            else {
                //this is accept location request
                var url = globals.base_url + 'api/acceptLocation'
                var obj = globals.constructPacket({username: globals.user, friend: notif})
                var success = globals.sendPacket(obj, url, 
                    () => {
                        console.log('[+] success declined location: ' + notif)
                    })

            }
        }
    }

    //Button action for "ok" for friend/location acceptance notifcation
    //Simply removes notifaction as there is nothing to be done
    buttonAction2(notif) {
        var index = globals.notifications.indexOf(notif)
        globals.notifications.splice(index, 1)
        this.setState({notifications: globals.notifications})

        var url = globals.base_url + 'api/removeNotification'
        var obj = globals.constructPacket({username: globals.user, notification: notif})
        var success = globals.sendPacket(obj, url, 
            () => {
                console.log('[+] success accepted friend: ' + notif)
            }) 
    }


    //renders whether or not notifcation displays "acceot" and "decline" buttons
    // or one "ok" button
    renderif(bool, button, otherbutton) {
        if (bool) {
            return button //'accept' and 'reject' 
        }
        else {
            return otherbutton // "ok"
        }
    }

    // Render function uses listview with globals.notifications and state.requests as source list

    //  globals.notifications contains only informational 'ok' type notifications
    //      each element of the list is a string notification like 'john has accepted your location'

    //  state.requests contains all friend and location requests
    //  note: friend_requests is a list used to differentiate location and friend requests
    render() {
        return (
            <View style={this.style.container}>
                <View style={this.style.navbar}>
                    <NavBar/>
                </View>
                <View style={this.style.pagecontainer}>
                    <Text style={this.style.titleText}>
                        {this.state.notifications.length + this.state.requests.length != 0 ? this.state.notifTitleText : this.state.noNotifText}
                    </Text>
                    <ListView
                        dataSource={this.ds.cloneWithRows(this.state.notifications.concat(this.state.requests))}
                        renderRow={(row) => 
                            <View>
                                <View style={this.style.divider}></View>
                                <TouchableHighlight 
                                    onPress={() => this.highlightAction(row)}
                                    underlayColor='#dcdcdc'
                                >
                                <Text style={this.style.rowtext}>
                                    {(this.state.notifications.indexOf(row) > -1) ?
                                            row.concat(this.state.noMessage) : 
                                            ((globals.friend_requests.indexOf(row) > -1) ? row.concat(this.state.friendRequestMessage) 
                                            : row.concat(this.state.locationRequestMessage))}
                                </Text>
                                </TouchableHighlight>
                                    {this.renderif((this.state.requests.indexOf(row) > -1),
                                    <View style={this.style.row}>
                                        <Button
                                            onPress={() => this.buttonAction(row, 'accept')}
                                            title={'accept'}
                                            color='darkgreen'
                                        />
                                        <Button
                                            onPress={() => this.buttonAction(row, 'decline')}
                                            title={'decline'}
                                            color='darkred'
                                        />
                                    </View>,
                                    <View style={this.style.okbutton}>
                                        <Button
                                            onPress={() => this.buttonAction2(row)}
                                            title={'ok'}
                                            color='darkorange'
                                        />
                                    </View>
                                    )}
                            </View>
                        }
                        enableEmptySections={true}
                    />
        
                </View>

            </View>
        );
    }

}

