
var construct = function(obj) {
    var packet = {
        method: 'POST',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': globals.token,
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
                    }
                    else {
                        console.log('log in fail:')
                        console.log(response.reason)
                    }
                    break

                case 'registration':
                    console.log('signing user up')
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
    base_url: 'http://107.170.249.224:8080/',
    token: '',

    //app user info
    user:           '',
    friendslist:    [],

    //name of user to display on profile page
    userpage:           '',

    //pending info, should notify user if anything here
    loc_requests:       [],
    loc_replys:         [],
    friend_requests :   [],
    friend_replys :     [],

    userLocation: {
        latitude: '',
        longitude: '',
    },

    firendlocs: {},

    nav: '',
    sendPacket: send,
    constructPacket: construct,
    routeTo: route,

}

