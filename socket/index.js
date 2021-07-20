const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];
let timeusers = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}
// Time
const addtimeUser = (userId, socketId) => {
    !timeusers.some(user => user.userId === userId) &&
    timeusers.push({ userId, socketId });
}

const removetimeUser = (socketId) => {
    timeusers = timeusers.filter(user => user.socketId !== socketId)
}



io.on("connection", (socket) => {
    console.log("a user connected.")
    console.log(users)
    
    //  take user id from the array
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // send and get message

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        console.log(receiverId)
        const user = getUser(receiverId);
        console.log("hello", user)
        io.to(user?.socketId).emit("getMessage", {senderId, text: text})
    })



    socket.on("disconnect", () => {
        console.log("a user has disconnected!")
        removeUser(socket.id)
        removetimeUser(socket.id)
        io.emit("getUsers", users)

    })

       //  take user id from the array
       socket.on("addTimeUser", userId => {
           console.log("hello", userId)
        addtimeUser(userId, socket.id)
        io.emit("getTimeUsers", timeusers)
    })



})




