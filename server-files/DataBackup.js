/*
    Citations:
    - Followed a tutorial from risingstack.com
*/
// require() loads modules. It is the equivalent of "imports" or "includes" as used in C, Java, Python, etc.
const file = require('fs')

app.post('/users', function (require, result) {
    const user = request.body
    // Outputs all users to a file called AllUsers.txt
    file.appendFile('AllUsers.txt', JSON.stringify({
        name: user.name,
        username: user.name,
        pass: user.password}), (err) => {
            res.send('You have successfully signed up.')
    })
})