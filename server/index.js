import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import conversationRoutes from './routes/conversations.js'
import messageRoutes from './routes/messages.js'
import commentRoutes from './routes/comments.js'
const app = express()

dotenv.config()

app.use(bodyParser.json({limit:"30mb", extended: true }))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true }))

app.use(cors());
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/conversations', conversationRoutes)
app.use('/messages', messageRoutes)
app.use('/comments', commentRoutes)
//port



//middleware

app.use(express.json())
app.use(express.static("public"))   

//data routes goes here


const CONNECTION_URL = process.env.CONNECTION_URL 

const PORT = process.env.PORT || 5050;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log("Server running on port", PORT))).catch((err ) => console.log(err.message))

mongoose.set('useFindAndModify', false)

