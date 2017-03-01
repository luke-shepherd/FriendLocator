
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
            loc: {  longitude: -122.032,
                    latitude: 36.96},

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

        setInterval( () => {

            //setting location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({loc: position.coords})
                    console.log("-------FOUND POSITION--------")
                    console.log(this.state.loc)
                    console.log(`Longitude: ${this.state.loc.longitude}`)

                    globals.userLocation.lat = position.coords.latitude;
                    globals.userLocation.long = position.coords.longitude;

                    //query friend locations

                    if (globals.friendloc.length() > 0) {

                        for (var friend in friendloc) {

                            //query all friend locations 
                            //this.constructpacket()
                            //this.sendpacket(obj)

                            //display on map   
                            //globals.friendlocs[friend].lat = obj.position.lat
                            //globals.friendlocs[friend].long = obj.position.long 
                        }
                      

                        globals.userLocation.lat = position.coords.latitude;
                        globals.userLocation.long = position.coords.longitude;

                    }

                    //set region

                }, (error) => console.log(JSON.stringify(error)),
                {enableHighAccuracy: false, timeout: 20000}
            )
        }, 1000)

        ///this.watchID = navigator.geolocation.watchPosition((position) => {
         //   var lastPosition = JSON.stringify(position);
        //    this.setState({loc: lastPosition.coords});
       // });
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

