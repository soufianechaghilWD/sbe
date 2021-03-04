import express from 'express'
import Posts from '../models/posts.js'
import Users from '../models/users.js'

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
        else { 
            Users.updateOne(
                {"_id": data.poster},
                {$addToSet: {"posts": [result._id]}}
                ,(err, resu) => {
                    if(err) res.status(406).send(err)
                    else res.status(201).send(resu)
                })
        }
    })
})
.get((req, res) => {

    //Get all posts
    Posts.
    find({}).
    populate('poster').
    populate({
        path: "comments",
        populate: {
            path: "commenter",
            model: "User"
        }
    }).
    exec((err, results) => {
        if(err) res.status(400).send(err)
        else res.status(200).send(results)
    })
})

// Add a like to a post

postsRouter.route('/addlike/:postId')
.put((req, res) => {
    Posts.updateOne(
        {"_id": req.params.postId},
        {$addToSet: {"likes": [req.body.liker]}},
        (err, resu) => {
        if(err) res.status(406).send(err)
        else {
            Posts.find({_id: req.params.postId}).
            populate('poster').
            populate({
                path: "comments",
                populate: {
                    path: "commenter",
                    model: "User"
                }
            }).
            populate('likes').
            exec((err, ress) => {
                if(err) res.status(400).send(err)
                else res.status(200).send(ress)
            })
        }
    })
}) 

// Get the posts for the front page

postsRouter.route('/page/:wantedId')
.get((req, res) => {

    //Get all posts
    Posts.
    find({}).
    populate('poster').
    populate({
        path: "comments",
        populate: {
            path: "commenter",
            model: "User"
        }
    }).
    populate('likes').
    exec((err, resu) => {
        if(err) res.status(400).send(err)
        else {
            Users.findById(req.params.wantedId, (err, resul) => {
                if(err) res.status(400).send(err)
                else{
                    // Sort the array by time
                    const sendingInfo = resu.sort((a, b) => b.time - a.time)
                    // Get only posts of people the user follows
                    res.status(200).send(sendingInfo.map(x => {if (resul.peopleUserFoll.includes(x.poster._id) === true) return x}).filter(it => it !== undefined))
                }
            })
        }
    })
})


export default postsRouter