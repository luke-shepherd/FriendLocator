
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
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
            },
            inputbox: {
                height: 60,
                width: 300,
                fontSize: 20,
            },
            text: {
                fontSize: 35,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
            }
        });
    }

    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    sendPacket(obj) {
        var url = globals.base_url + 'endpoint'
        let response = fetch(url, obj)
            .then((response) => response.json())
            .then((resonseJson) => {
                console.log(responseJson)
                //parse

                /*
                    body: {
                        type: 'response',
                        success: true,
                        reason: 'could not find username'
                    }
                */
            
                //var gotResults = ['search', 'result', 'list']
                //this.setState({results: gotResults})

                if (false) return true
                return false
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    }

    constructPacket() {
        var obj = {
            method: 'POST',
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                type: 'search',
                user: this.state.username,
            })
        }
        return obj
    }

    onTextUpdate(query) {
        this.setState({text: query})
        
        /*
            send request to server, parse response
        */

        //var obj = this.constructPacket()
        //var success = this.sendPacket(obj)
        var success = true

        if (!success) {
            this.setState({results: ['no results']})
        } 

        //DEBUG
        else {
            var temp = this.state.results
            temp.push(query)
            this.setState({results: temp})
        }
    
    }

    render() {
        return (
            <View style={this.style.container}>
                <TextInput
                    style={this.style.inputbox}
                    onChangeText={(text) => this.onTextUpdate(text)}
                />
                <Text style={this.style.text}>
                    query: {this.state.text}
                </Text>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.results)}
                    renderRow={(row) => 
                        <Text>
                            {row}
                        </Text>
                    }
                    enableEmptySections={true}
                />
            </View>
        );
    }

}

