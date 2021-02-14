import express from 'express'
import Posts from '../models/posts.js'


const postsRouter = express.Router()

postsRouter.use(express.json())

postsRouter.route('/')
.post((req, res) => {
    const data = req.body

    //add a new Post
    Posts.create(data, (err, result) => {
        if(err) {
            console.log(err)
            res.status(501).send(err)
        }
        else res.status(201).send(result)
    })
})
.get((req, res) => {

    //Get all posts
    Posts.
    find({}).
    populate('poster').
    exec((err, results) => {
        if(err) res.status(400).send(err)
        else res.status(200).send(results)
    })
})



export default postsRouter