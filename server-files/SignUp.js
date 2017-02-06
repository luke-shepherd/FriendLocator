/*
    Citations:
    - Followed a tutorial from risingstack.com
*/
const users = []

app.post('/users, function(request, result)') {
    // Retrieve the data from the post's body
    const user = request.body
    // Take in the user's name, desired username, and password
    users.push({
        name: user.name,
        username: user.name,
        pass: user.password
    })
    res.send('You have successfully signed up.')
}