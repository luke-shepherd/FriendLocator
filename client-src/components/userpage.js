/*  userpage.js
    
    Code for user page component. Here users see their own profile picture, 
    their user name, and a list of their friends which if pressed will take them 
    to that friends page. 
    

    written by Luke Shepherd with contributions by Kyle Danna
*/
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
            data: globals.friendslist,
        }
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#C5C1AA',
            },
            title: {
                fontSize: 40,
                textAlign: 'center',
                marginBottom: 20,
                marginTop: 100,
                color: '#222222',
            },
            button: {
                position: 'absolute',
                top: 10,
                bottom: 150,
                left: 120,
                right: 150,
            },
            listcontainer: {
                flex: 1,
            },
            friendstext: {
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 5,
                marginTop: 10,
                textDecorationLine: 'underline',
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
                borderRadius: 100,
                backgroundColor: '#C5C1AA',
                marginTop: 10,
                marginBottom: 20,
            },

        });
    }

    //called when friend list element is selected
    //route to user profile of notification (ie your friend)
    highlightAction(friend) {
        globals.userpage = friend
        setTimeout ( () => {
            globals.routeTo('FriendPage')
        }, 500)

    }

    //update user information every time component is navigated to
    componentDidMount() {
        var obj = globals.constructPacket({username: globals.user});
        var success = globals.sendPacket(obj, globals.base_url + 'api/updateUser',
                    () => {/*console.log('successfully updated user notifications etc')*/})
    }

    /* Renders 
        - navbar
        - user name
        - profile picture in a circular frame
        - friend list
    */
    render() {
        return (
                <View style={this.style.container}>
                    <View style={this.style.navbar}>
                        <NavBar/>
                    </View>
                    <Text style = {this.style.title}>
                        {globals.user}
                    </Text>
                    <Image style={this.style.circle}
                           source={require('./assets/stock_prof_pic.jpg')}/>


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
                </View>
               );
    }

}
