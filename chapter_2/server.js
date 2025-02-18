const express = require('express') // import express to server
const app = express() //define backend app (as a function)
const port = 3001

let data = ['Test']

//Middleware
app.use(express.json())


// End Point -- HTTP VERBS (Method) && Routes (or paths)
// The method informs the nature of request and the route is a further
// subdirectory (basically we direct the request to the body of code to respond
// appropriately, and these locations or routes are called endpoints)
app.get('/', (req, res) => {
    // this is endpoint number 1 - /
    console.log("Show status 200", req.method),
        res.sendStatus(200) //send Response status to Front (เปลี่ยนได้)
});


//Type 1 -- Website endpoints (these endpoints are for sending back HTML and they typically
// come when a user enters a URL in a browser)

app.get('/web', (req, res) => {
    res.send("<h1>This is Web Title with HTML Code</h1><input/>"), //send HTML Code Response to Front
        console.log("<h1>This is Web Title with HTML Code</h1><input/>")
});

app.get('/web-crude', (req, res) => {
    res.send(`
        <body style="background:pink; color:blue;">
            <h1>Data</h1>
            <p>${JSON.stringify(data)}</p>
        </body>
        `)
});
//Template litteral String `` for inject data 

app.get('/dashboard', (req, res) => {
    console.log("/ Dashboard"),
        res.send("This is Dashboard Route") //send Response to Front
});

//Type 2 -- API endpoints (non visual)

//CRUD - Create-post read-get update-put and delete-delete

// 'api/' to show there have no HTML Code send only data
app.get('/api/data', (req, res) => {
    console.log("This one was for show data"),
        res.send(data) //send Response to Front
});

app.post('/api/data', (req, res) => {
    //sample create user >> browser send nwtwork req to server to handle action
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name) //push new create to body
    res.sendStatus(201)
});

app.delete('/api/endpoint',(req, res) => {
    data.pop
    console.log("Delete the data successful")
    res.sendStatus(203)
})


//*******************************************************/
console.log("Server: Server is running"),
    app.listen(port, () => console.log(`port: ${port}`)); //listen to incoming request from port 3000


//** Terminal Command **
//run this file: node server.js
//kill server: Ctrl+C

//The address of this server connected to the network is
//URL -> http://localhost:3001
//ip -> 127.0.0.1:3001