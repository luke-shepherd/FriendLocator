
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import MapView from 'react-native-maps';

globals = require('./globals')
import SearchBar from './searchbar.js';
import NavBar from './navbar.js';

export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: 'nolocation',
            user: 'nouser',
        }
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
            searchbar: {
                position: 'absolute',
                alignItems: 'center',
                top: 50,
                left: 0,
            },
            navbar: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            },
            map: {
                position: 'absolute',
                top: 50,
                left: 0,
                right: 0,
                bottom: 0
            },
        });
    }

    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    sendPacket(obj) {
        var url = globals.base_url + 'update'
        let response = fetch(url, obj)
            .then((response) => response.json())
            .then((resonseJson) => {
                console.log(responseJson)
                //read into json object and parse
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
                type: 'locationUpdate',
                user: this.state.user,
                userLocation: this.state.loc,
            })
        }
        return obj
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({loc: JSON.stringify(position)})
                console.log(this.state.loc)
            }, (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000}
        )
    }

    render() {
        return (
             <View style={this.style.container}>
                <View style={this.style.navbar}>
                    <NavBar/>
                </View>
                <MapView
                    style={this.style.map}
                    initialRegion={{
                        latitude: 46.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <View style={this.style.searchbar}>
                    <SearchBar/>
                </View>
            </View>  
        );
    }

}

