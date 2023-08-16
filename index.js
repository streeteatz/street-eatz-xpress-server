const express = require('express');
const app = express()
const http = require("http")
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "https://streeteatz-jizp.onrender.com",
    allowedHeaders: ["street-eat"],
    credentials: true,
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_data", (data) => {
    socket.broadcast.emit("receive_data", data)
  })

  socket.on("send_address", (data => {
    socket.broadcast.emit("receive_address", data)
  }))
})


server.listen(3001, () => {
  console.log('server is running')
})