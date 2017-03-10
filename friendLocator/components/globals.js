
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
                        //console.log(response.notifications)
                        //console.log('CURRENT NOTIFICATIONS: ' + module.exports.notifications);
                        module.exports.notifications = response.notifications;
                        //console.log('RECIEVED NOTIFICATIONS: ' + module.exports.notifications);
 
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
            for (var i = 0; i < data.length; i++) {
                switch (data[i][0]) {
                    case 'user':
                        module.exports.user = data[i][1]
                        break
                    case 'token':
                        module.exports.token = data[i][1]
                        break
                }
            }
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

    //name of user to display on profile page
    userpage:   '',

    //pending info, should notify user if anything here
    notifications:  [],
    searchresults: [],

    userLocation: {
        latitude:   '',
        longitude:  '',
    },

    friendlocs: {},

    //objects and methods
    nav:                '',
    sendPacket:         send,
    constructPacket:    construct,
    routeTo:            route,
    dump:               store,
    load:               get,
    
    notificationinterval: 2000,
    updateinterval: 2000,
    locationinterval: 2000, 
    dumpinterval: 1000
}

