import express from 'express'
import Comments from '../models/comments.js'
import Posts from '../models/posts.js'

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

// Add a comment to a Post

commentsRouter.route('/add/:postId')
.put((req, res) => {
    Posts.updateOne({"_id": req.params.postId}, {$addToSet: {"comments": [req.body.comment]}}, (err, results) => {
        if(err) res.status(406).send(err)
        else res.status(200).send(results)
    })
})

export default commentsRouter
