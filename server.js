import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

import usersRouter from './routes/user.js';
import postsRouter from './routes/posts.js'
import commentsRouter from './routes/comments.js'


const app =express()
const port = process.env.PORT ||7000

const connection_url = 'mongodb://localhost:27017/social'

const db = mongoose.connection

db.once('open', () => {
    console.log('DB is connected')
})


app.use(express.json())
app.use(cors())
app.use('/user', usersRouter)
app.use('/post', postsRouter)
app.use('/comment', commentsRouter)

app.get('/', (req, res) => res.status(200).send('hello world'))


mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))