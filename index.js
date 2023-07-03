const http = require("http");
const WebSocketServer = require("websocket").server

let connection = null

const httpserver = http.createServer((req, res) => {
    console.log("We have received a request")
})

// This shit does websocket handshake
const websocket = new WebSocketServer({
    "httpServer": httpserver
})

websocket.on("request", request => {
    // This bit accespts protocol upgrade
    connection = request.accept(null, request.origin)

    connection.on("open", () => console.log("Opened!!!"))
    connection.on("close", () => console.log("CLOSED!!!"))
    connection.on("message", message => {
        console.log(`Recieved message ${message.utf8Data}`)
    })

    sendEvery5Seconds()
})

const port = 8000;
httpserver.listen(port, () => console.log(`My server is listening on port ${port}`))

function sendEvery5Seconds() {
    connection.send(`Message ${Math.random()}`)
    setTimeout(sendEvery5Seconds, 5000)
}