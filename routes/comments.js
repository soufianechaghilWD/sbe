import express from 'express'
import Comments from '../models/comments.js'

const commentsRouter = express.Router()

commentsRouter.use(express.json())
 
commentsRouter.route('/')
.post((req, res) => {
    const data = req.body

    //Create a new comment
    Comments.create(data, (err, results) => {
        if (err) res.status(501).send(err)
        else res.status(201).send(results)
    })
})


export default commentsRouter
