
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
import CustomMap from './CustomMap.js';

export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: '',

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


    componentDidMount() {
        
        //check for notifications on interval defined in global
        setInterval( () => {
            //var obj = constructPacket()
            //sendPacket(obj)
        }, globals.notificationinterval)

        

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({loc: JSON.stringify(position)})
                globals.userLocation.lat = position.coords.latitude;
                globals.userLocation.long = position.coords.longitude; 

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
                <MapView style={style.map}
                    region={{
                        latitude: globals.userLocation.lat,
                        latitudeDelta: 0.001,
                        longitude: globals.userLocation.long,
                        longitudeDelta: 0.001
                }} />
                <View style={this.style.searchbar}>
                    <SearchBar/>
                </View>
            </View>  
        );
    }

}

