
import {
    AsyncStorage,
} from 'react-native';

var construct = function(obj) {
    var packet = {
        method: 'POST',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': module.exports.token,
        },
        
        body: JSON.stringify(obj)
    }
    return packet
}

var send = function(obj, endpoint, action) {

    var url = endpoint
    let response = fetch(url, obj)
        //.then((response) => response.json())
        .then((response) => {
            
            ////console.log('TYPE IS: ' + JSON.parse(response._bodyText)["type"])

            response = JSON.parse(response._bodyText)

            //parse response depending on 
            //var type = responseJson.type
            //var type = responseJson.type
            var type = response.type

            switch(type) {
                //NOTE: do not return true, just break
                case 'login':

                    if (response.success) {
                        //console.log('logging user in')
                        //parse and set global variables
                        //globals.token = responseJson.token
                        //return false here if problem
                        //console.log('token:')
                        //console.log(response.token)
                        globals.token = response.token
                        //console.log('Global Token: ');
                        //console.log(globals.token);

                    }
                    else {
                        //console.log('log in fail:')
                        //console.log(response.reason)
                        return false
                    }
                    break

                case 'updateUser':
                    if (response.success) {
                        //update global vars
                        console.log(response)
                        //console.log('CURRENT NOTIFICATIONS: ' + module.exports.notifications);
                        module.exports.notifications = response.notifications;
                        module.exports.requests = response.requests;
                        module.exports.pending = response.pending;

                        module.exports.friendslist = response.friends_list;
                        
                        module.exports.friendlocs = response.locations 
                        console.log('RECIEVED LOCATIONS: ' + response.locations);

                        //Friend coord info

 
                    }
                    else {
                        //console.log('update failed')
                        //console.log(response.reason)
                        return false
                    }
                    break

                case 'registration':
                    //console.log('signing user up')
                    break

                case 'updateloc':
                    //console.log('LOCATION RESPONSE:');
                    //console.log(response);
                    break
                
                case 'acceptFriend':
                    //console.log('[*] accept friend:');
                    if (!response.success) {
                        //console.log(response.reason);
                        return false
                    }
                    break

                case 'declineFriend':
                    if (!response.success) {
                        //console.log(response.reason);
                        return false
                    }
                    //console.log('[*] decline friend:');
                    break

                case 'search':
                    if (response.success) {
                        if (!response.results) {
                            module.exports.searchresults = ['no results :(']
                        }
                        else {
                            module.exports.searchresults = response.results;
                        }
                        return true
                    }
                    else {
                        //console.log(response.reason);
                        return false
                    }
                    break
                case 'locationRequest':
                    //if (response.success) {
                        //{token: '21321', username: 'test2', latlng: {latitude: 36.94, longitude: -122.101 }},
                    //}
                    break

                default:
                    //console.log('Receive unknown type ERROR WILL ROBINSON');
                    //console.log('This is what I did get')
                    //console.log(response)
                    break

            }
            //action always invoked by default
            action()
            return true
        })
        .catch((error) => {
            //console.log(error)
            return false
        })
    }

var route = function(sceneId) {
    //console.log('[+] navigating to: ' + sceneId)
    module.exports.nav.replace({id: sceneId});
}

//returns key value pairs for all data in module.exports
var allkeysandvalues = function() {
    return [['user', module.exports.user], 
            ['token', module.exports.token]]
}

//returns keys for all data in module.exports
var allkeys = function() {
    return ['user', 'token']
}

//sets all variables
var store = function() {
    ////console.log(module.exports)
    ////console.log('[+] storing data')
    AsyncStorage.multiSet(allkeysandvalues(), 
        () => {
            //console.log('[+] set a bunch of stuff successfully')
            //set all globals accordingly
        })
}

//gets all variables
var get = function() {
    ////console.log(module.exports)
    AsyncStorage.multiGet(allkeys(), 
        (err, data) => {
            //console.log('[+] got a bunch of stuff successfully')
            //set all globals accordingly
            //console.log(data)
            module.exports.user = data[0][1]
            module.exports.token = data[1][1]
        })
}

module.exports = {

    //server info
    base_url:   'http://107.170.249.224:8080/',
    token:      '',

    //app user info
    user:           '',
    pass:           '',
    friendslist:    [],

    //name of user to display on friend profile page
    userpage:   '',
    userfriends: [],

    //pending info, should notify user if anything here
    notifications:  ['someone accepted your request', 'you also got denied', 'thisisacrazylongnotificationsgkjdfsglkjshdfgkjshdfgkljahsdkfjhakljshgkljsdfhgkjdfgsdklfjgsdfg'],
    requests: ['fourteenelephants', 'will', 'barack', 'john', 'jacob'],
    pending: [],
    searchresults: [],


    userLocation: {
        latitude:   '',
        longitude:  '',
    },

    friendlocs: [/*{token: '12312', username: 'test', latlng: {latitude: 36.95, longitude: -122.101 }}, 
                 {token: '21321', username: 'test2', latlng: {latitude: 36.94, longitude: -122.101 }},
                 {token: '21311', username: 'test3', latlng: {latitude: 36.94, longitude: -122.111 }}*/],

    //objects and methods
    nav:                '',
    sendPacket:         send,
    constructPacket:    construct,
    routeTo:            route,
    dump:               store,
    load:               get,
    
    notificationinterval: 2000,
    updateinterval: 2000,
    locationinterval: 20000, 
    dumpinterval: 1000,
    loginwait: 100,
}

