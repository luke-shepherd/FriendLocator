
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

globals = require('./globals')

export default class NotifPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1 !== r2}
        )
        this.state = {
            //retrieve from globals
            data: ['notification1', 'notification2']
        }

        this.style = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            row: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            rowtext: {
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 5,
            },
        });
    }

    routeTo(sceneId) {
        this.props.nav.replace({id: sceneId});
    }

    highlightAction(notif) {
        console.log('[*] pressed: ' + notif)
        //route to user profile of notification (ie your friend)
        //this.routeTo()
    }

    buttonAction(notif, action) {
        if (action == 'decline') {
            //remove notification from global variable
            //var obj = constructPacket()
            //var success = sendPacket(obj)
            //wait for acknowledge response to perform action

            console.log('[*] declined: ' + notif)
            //remove row from list
            var temp = this.state.data
            var index = temp.indexOf(notif)
            temp.splice(index)
            //this.setState({data: temp})
        }
        else {
            //remove notification from global variable
            //var obj = constructPacket()
            //var success = sendPacket(obj)
            //wait for acknowledge response to perform action

            console.log('[*] accepted: ' + notif)
            //remove row from list
            var temp = this.state.data
            var index = temp.indexOf(notif)
            temp.splice(index)
            //this.setState({data: temp})
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.data)}
                    renderRow={(row) => 
                        <View style={this.style.row}>
                        <TouchableHighlight 
                            onPress={() => this.highlightAction(row)}
                            underlayColor='#dcdcdc'
                        >
                        <Text style={this.style.rowtext}>
                            {row}
                        </Text>
                        </TouchableHighlight>
                        <Button
                            onPress={() => this.buttonAction(row, 'accept')}
                            title={'accept'}
                            color='#841584'
                        />
                        <Button
                            onPress={() => this.buttonAction(row, 'decline')}
                            title={'decline'}
                            color='#841584'
                        />
                        </View>
                    }
                    enableEmptySections={true}
                />

            </View>
        );
    }

}

