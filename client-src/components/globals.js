/*  globals.js
   
    Code for impertive structure of program. "static" type functions and 
    global variables written here.


    written by Kyle Danna with contributions from Luke Shepherd 
*/


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


/*
    API communication function. 
    All API requests are handled by a call to this function

    obj: JSON containing user id information
    endpoint: url for API request, see ~/Packet_Header_Notes.txt for details.
    action: callback for caller function

    function returns true for success, false for failure
*/  
var send = function(obj, endpoint, action) {

    var url = endpoint
    let response = fetch(url, obj)
        .then((response) => {
            
            response = JSON.parse(response._bodyText)
            var type = response.type

            switch(type) {
                case 'login':

                    if (response.success) {
                        //parse and set global variables
                        //return false here if problem
                 
                        globals.token = response.token

                    }
                    else {
                        return false
                    }
                    break

                case 'updateUser':
                    if (response.success) {

                        //update global vars
                        //console.log(response)
                        module.exports.notifications = response.notifications;
                        module.exports.friend_requests = response.friends_request;
                        module.exports.requests = response.friends_request.concat(response.location_requests);
                        module.exports.pending = response.pendings;
                        module.exports.friendpending = response.friend_pendings;
                        module.exports.friendslist = response.friends_list;
                        module.exports.friendlocs = response.locations 
                       
                        //Friend coord info

 
                    }
                    else {

                        return false
                    }
                    break

                case 'registration':
                    //save id token for later use
                    if (response.success) {
                        globals.token = response.token
                    }
                    break

                case 'updateloc':
                    //nothing to be done client side
                    break
                
                case 'acceptFriend':
                    //nothing to be done
                    if (!response.success) {
                        return false
                    }
                    break

                case 'declineFriend':
                    //nothing to be done
                    if (!response.success) {
                        return false
                    }
                    break

                case 'removeNotification':
                    if (response.success) {
                        //update notification page from updateUser
                    }

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
                        return false
                    }
                    break
                case 'acceptLocation':
                    //nothing to be done client side
                    break
                case 'locationRequest':
                    break

                default:
                    break

            }

            //action always invoked by default
            action()
            return true
        })
        .catch((error) => {
            return false
        })
    }



/* 
    Page navigation function
    sceneId: name of component to navigate to
*/
var route = function(sceneId) {
    module.exports.nav.replace({id: sceneId});
}

//returns user-ID token pairs for all data in module.exports
var allkeysandvalues = function() {
    return [['user', module.exports.user], 
            ['token', module.exports.token]]
}

//returns username keys for all data in module.exports
var allkeys = function() {
    return ['user', 'token']
}

//sets all variables so that they can be saved when app closes
var store = function() {
    ////console.log(module.exports)
    ////console.log('[+] storing data')
    AsyncStorage.multiSet(allkeysandvalues(), 
        () => {
            //console.log('[+] set a bunch of stuff successfully')
            //set all globals accordingly
        })
}

//gets all variables, used on app startup
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
    notifications:  [], //contains just informational notifcations
    requests: [], //contains both friend and location requests
    friend_requests: [], //contains only friend requests
    pending: [], //contains all pending requests (location and friend)
    friendpending: [], //contains only friend requests that are pending
    searchresults: [], //returned search results

    intervals: [],


    userLocation: {
        latitude:   '',
        longitude:  '',
    },

    friendlocs: [/*{token: '', username: '', latlng: {latitude: '', longitude: ''}}*/],

    //objects and methods
    nav:                '',
    sendPacket:         send,
    constructPacket:    construct,
    routeTo:            route,
    dump:               store,
    load:               get,
    

    //interval constants
    notificationinterval: 2000,
    updateinterval: 2000,
    locationinterval: 2000, 
    dumpinterval: 1000,
    loginwait: 100,

    loops: true,
}

