const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];
let timeusers = [];

const addUser = (userId, socketId) => {
    console.log(users.findIndex(user => user.userId === userId))
    if (users.findIndex(user => user.userId === userId) === -1) {

        !users.some(user => user.userId === userId) &&
            users.push({ userId, socketId });
    } else {
        users.splice(users.findIndex(user => userId === user.userId), 1, { userId, socketId })
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}
// Time
const addtimeUser = (userId, socketId) => {

    if (timeusers.findIndex(user => user === user.userId) === -1) {
        !timeusers.some(user => user.userId === userId) &&
            timeusers.push({ userId, socketId });
    } else {
        timeusers.splice(timeusers.findIndex(user => user === user.userId), 1, { userId, socketId })
    }
}

const removetimeUser = (socketId) => {
    timeusers = timeusers.filter(user => user.userId !== socketId)
}



io.on("connection", (socket) => {

    //  take user id from the array
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // send and get message

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {

        const user = getUser(receiverId);
        console.log("getUser of receiver id provided", user)
        console.log(users)
        io.to(user?.socketId).emit("getMessage", { senderId, text: text })
    })



    socket.on("disconnect", () => {
        console.log("a user has disconnected!")
        console.log(socket.id)
        removeUser(socket.id)
        removetimeUser(socket.id)
        io.emit("getUsers", users)

    })

    //  take user id from the array
    socket.on("addTimeUser", userId => {
        addtimeUser(userId, socket.id)
        io.emit("getTimeUsers", timeusers)
        console.log("connecting")

    })

    socket.on("disconnectUser", (userId) => {
        removetimeUser(userId)
        io.emit("getTimeUsers", timeusers)
        console.log("disconnecting")
    })


})




