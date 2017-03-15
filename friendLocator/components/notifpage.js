
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
            notifications: ['Jeff! has accepted your friend request'],//globals.notifications,
            requests: ['Jimmy Boy', 'Carrot', 'John Cena'],//globals.requests,
            ntext: 'no notifications  ;(',
            ntitle: 'Notifications',
            nmsg: '',
            rmsg: ' has requested your location',
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
            ntext: {
                flex:1,
                position: 'absolute',
                top: 300,
                left: 100,
                fontSize: 20,
            },
            titletext: {
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
        console.log('[*] pressed: ' + notif)
        //if (this.state.notifications.indexOf(notif) > -1) {
        //    //if its a notification, remove row from list
        //    var index = globals.notifications.indexOf(notif)
        //    globals.notifications.splice(index, 1)
        //    this.setState({notifications: globals.notifications})
        //}
        //else do nothing
    }

    buttonAction(notif, action) {
        //respond to the request
        if (action == 'decline') {
            //remove row from list
            var index = globals.requests.indexOf(notif)
            globals.requests.splice(index, 1)
            this.setState({requests: globals.requests})

            var url = globals.base_url + 'api/declineFriend'
            var obj = globals.constructPacket({username: globals.user, friend: notif})
            var success = globals.sendPacket(obj, url, 
                () => {
                    console.log('[+] success declined friend: ' + notif)
                })
        }
        else {
            //remove row from list
            var index = globals.requests.indexOf(notif)
            globals.requests.splice(index, 1)
            this.setState({requests: globals.requests})

            var url = globals.base_url + 'api/acceptFriend'
            var obj = globals.constructPacket({username: globals.user, friend: notif})
            var success = globals.sendPacket(obj, url, 
                () => {
                    console.log('[+] success accepted friend: ' + notif)
                    globals.friendslist.append(notif)
                })
        }
    }

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

    renderif(bool, button, otherbutton) {
        if (bool) {
            return button
        }
        else {
            return otherbutton
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <View style={this.style.navbar}>
                    <NavBar/>
                </View>
                <View style={this.style.pagecontainer}>
                    <Text style={this.style.titletext}>
                        {this.state.notifications.length + this.state.requests.length != 0 ? this.state.ntitle : this.state.ntext}
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
                                            row.concat(this.state.nmsg) : row.concat(this.state.rmsg)}
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

