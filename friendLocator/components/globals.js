
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

    //DEBUG
    //action()
    //return true
    
    var url = endpoint
    let response = fetch(url, obj)
        //.then((response) => response.json())
        .then((response) => {
            
            //console.log('TYPE IS: ' + JSON.parse(response._bodyText)["type"])

            response = JSON.parse(response._bodyText)

            //parse response depending on 
            //var type = responseJson.type
            //var type = responseJson.type
            var type = response.type

            switch(type) {
                //NOTE: do not return true, just break
                case 'login':

                    if (response.success) {
                        console.log('logging user in')
                        //parse and set global variables
                        //globals.token = responseJson.token
                        //return false here if problem
                        console.log('token:')
                        console.log(response.token)
                        globals.token = response.token
                        console.log('Global Token: ');
                        console.log(globals.token);

                    }
                    else {
                        console.log('log in fail:')
                        console.log(response.reason)
                        return false
                    }
                    break

                case 'updateUser':
                    if (response.success) {
                        console.log(response.notifications)

                        console.log('CURRENT NOTIFICATIONS: ' + module.exports.notifications);
                        module.exports.notifications = response.notifications;
                        console.log('RECIEVED NOTIFICATIONS: ' + module.exports.notifications);
 
                    }
                    else {
                        console.log('update failed')
                        console.log(response.reason)
                        return false
                    }
                    break

                case 'registration':
                    console.log('signing user up')
                    break

                case 'updateloc':
                    console.log('LOCATION RESPONSE:');
                    console.log(response);
                    break
                
                case 'acceptFriend':
                    console.log('[*] accept friend:');
                    if (!response.success) {
                        console.log(response.reason);
                        return false
                    }
                    break

                case 'declineFriend':
                    if (!response.success) {
                        console.log(response.reason);
                        return false
                    }
                    console.log('[*] decline friend:');
                    break

                default:
                    console.log('Receive unknown type ERROR WILL ROBINSON');
                    break

            }
            //action always invoked by default
            action()
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        })
    }

var route = function(sceneId) {
    console.log('navigating to: ' + sceneId)
    module.exports.nav.replace({id: sceneId});
}

module.exports = {

    //server info
    base_url:   'http://107.170.249.224:8080/',
    token:      '',

    //app user info
    user:           '',
    friendslist:    [],

    //name of user to display on profile page
    userpage:   '',

    //pending info, should notify user if anything here
    notifications:  [],

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
    
    notificationinterval: 200000,
    locationinterval: 2000, 
}

