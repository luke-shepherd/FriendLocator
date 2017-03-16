
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
            region: {  
                latitude: 0, //parseInt(globals.userLocation.latitude, 10),
                latitudeDelta: 0.1,
                longitude: 0, //parseInt(globals.userLocation.longitude, 10),
                longitudeDelta: 0.1
            },
            friends: globals.friendlocs,

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
                justifyContent: 'center',
                alignItems: 'center',
                top: 58,
                left: 8,
                right: 8,

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
        
        if(globals.loops) {
        
            //keep map updated
            setInterval( () => {
                if (globals.nav.getCurrentRoutes()[0].id == 'MapPage') {
                    this.state.friends = globals.friendlocs
                }
            }, globals.updateinterval)
            
            //persistant data storage
            setInterval( () => {
                globals.dump()
            }, globals.dumpinterval)

            //check for notifications and updates
            setInterval( () => {
                var obj = globals.constructPacket({username: globals.user});
                var success = globals.sendPacket(obj, globals.base_url + 'api/updateUser',
                    () => {console.log('successfully updated user notifications etc')})
            }, globals.updateinterval)

            //send location to server on interval
            setInterval( () => {
                if (globals.user != '') {
                    var obj = globals.constructPacket({username: globals.user,
                                                       longitude: globals.userLocation.longitude,
                                                       latitude: globals.userLocation.latitude});

                    var endpoint = globals.base_url + 'api/updateloc'
                    var success = globals.sendPacket(obj, endpoint, () => {console.log('successfully updated location to db')})
                }
            }, globals.locationinterval)

            globals.loops = false

        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                globals.userLocation.longitude = position.coords.longitude
                globals.userLocation.latitude = position.coords.latitude
                if (globals.nav.getCurrentRoutes()[0].id == 'MapPage') {

                    globals.userLocation.latitude = position.coords.latitude;
                    globals.userLocation.longitude = position.coords.longitude;

                    this.setState({region: {  
                                    latitude: parseFloat(position.coords.latitude),
                                    latitudeDelta: 0.1,
                                    longitude: parseFloat(position.coords.longitude),
                                    longitudeDelta: 0.1,
                                   }}
                    );
                }

                console.log(this.state.loc)
            }, (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000}
        )
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
             <View style={this.style.container}>
                <MapView style={this.style.map}
                    region={this.state.region}
                    showsUserLocation={true}
                    showsCompass={false}>
                    {this.state.friends.map(marker => (
                        <MapView.Marker
                              key={marker.token}
                              coordinate={marker.latlng}
                              title={marker.username}
                        />
                    ))}
                </MapView>

                <View style={this.style.searchbar}>
                    <SearchBar/>
                </View>
                <View style={this.style.navbar}>
                    <NavBar/>
                </View>
            </View>  
        );
    }

}

