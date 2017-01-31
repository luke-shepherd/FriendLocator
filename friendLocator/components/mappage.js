
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

export default class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: '',
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
        });
    }

    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({loc: JSON.stringify(position.coords)})
            }, (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000}
        )
    }

    render() {
        return (
            <View style={this.style.container}>
                <Text style={this.style.text}>
                    Map Page
                </Text>

                <Text style={this.style.text}>
                    Location: {this.state.loc}
                </Text>
            </View>
        );
    }

}

