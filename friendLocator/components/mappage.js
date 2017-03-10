
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
                latitude: 36.97, //parseInt(globals.userLocation.latitude, 10),
                latitudeDelta: 0.1,
                longitude: -122.03, //parseInt(globals.userLocation.longitude, 10),
                longitudeDelta: 0.1
            },

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
        
        //persistant data storage
        setInterval( () => {
            globals.dump()
        }, globals.dumpinterval)

        //check for notifications and updates
        setInterval( () => {
            var obj = globals.constructPacket({username: globals.user});
            var success = globals.sendPacket(obj, globals.base_url + 'api/updateUser',
                () => {console.log('successfully updated')})
        }, globals.updateinterval)

        //send location to server on interval
        setInterval( () => {
            if (globals.user != '') {
                var obj = globals.constructPacket({username: globals.user,
                                                   longitude: globals.userLocation.longitude,
                                                   latitude: globals.userLocation.latitude});

                var endpoint = globals.base_url + 'api/updateloc'
                var success = globals.sendPacket(obj, endpoint, () => {console.log('success map')})
            }
        }, globals.locationinterval)


        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({loc: JSON.stringify(position)})
                globals.userLocation.latitude = position.coords.latitude;
                globals.userLocation.longitude = position.coords.longitude;

                this.setState({region: {  
                                latitude: parseFloat(position.coords.latitude),
                                latitudeDelta: 0.1,
                                longitude: parseFloat(position.coords.longitude),
                                longitudeDelta: 0.1,
                               }}
                );

                console.log(this.state.loc)
            }, (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000}
        )
    }

    /*updateFriendsViewable endpoint {
        'type': 'updateFriendsViewable'
        'locations': [{'longitude': , 'latitude': , 'username': }]
    }


*/
    render() {
        return (
             <View style={this.style.container}>
                <View style={this.style.navbar}>
                    <NavBar/>
                </View>
                <MapView style={this.style.map}
                    region={this.state.region}
                    showsUserLocation={true}/>
                <View style={this.style.searchbar}>
                    <SearchBar/>
                </View>
            </View>  
        );
    }

}

