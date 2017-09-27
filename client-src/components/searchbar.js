/*  searchbar.js
    
    Code for search bar component. Search bar is used to find other users
    and navigate to their profile page.
    
    written by Kyle with contributions from Luke Shepherd
*/ 

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
    TouchableHighlight,
    Navigator
} from 'react-native';

globals = require('./globals')

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2}
        )
        this.state = {
            text: '',
            results: [],
        }
        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
                borderRadius: 10,
                marginTop: 10,
            },
            inputbox: {
                height: 60,
                width: 300,
                fontSize: 20,
                borderRadius: 10,
            },
            rowtext: {
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
            }
        });
    }

    /* Called every time text is inputed into search bar.
        query is a string sent to the data base to find users

        updates search results which will autmatically update the results 
        seen on the screen through data binding
    */
    onTextUpdate(query) {
        this.setState({text: query})
        
        var url = globals.base_url + 'api/search'
        var obj = globals.constructPacket({
            user: globals.user,
            lookup: query,})
        var success = globals.sendPacket(obj, url,
            () => {
                //console.log('[*] search success')
            })

        //this is redundant
        if (!globals.searchresults) {
            globals.searchresults = ['no results :(']
        } else {
            this.setState({results: globals.searchresults})
        }
    }
    
    /* 
        called when a search result is selected
        results are always user names, and selected
        routes user to the profile page of the selected user. 
    */
    buttonAction(user) {
        //this.routeTo('Userpage')
        //console.log('[*] pressed: ' + user)
        
        if(user == globals.user) {
            setTimeout ( () => {
                globals.routeTo('UserPage')
            }, 500)
        }
        else {
            globals.userpage = user
            setTimeout ( () => {
                globals.routeTo('FriendPage')
            }, 500)
        }   
    }

    /* Render function for search bar. Source list for list view is globals.searchresults
    */
    render() {
        return (
            <View style={this.style.container}>
                <TextInput
                    placeholder='  search users'
                    style={this.style.inputbox}
                    onChangeText={(text) => this.onTextUpdate(text)}
                />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.results)}
                    renderRow={(row) => 
                        <TouchableHighlight 
                            onPress={() => this.buttonAction(row)}
                            underlayColor='#dcdcdc'
                        >
                            <Text style={this.style.rowtext}>
                                {row}
                            </Text>
                        </TouchableHighlight>
                    }
                    enableEmptySections={true}
                />
            </View>
        );
    }

}

