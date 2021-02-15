import express from 'express'

import Users from '../models/users.js'

const usersRouter = express.Router()

usersRouter.use(express.json())


usersRouter.route('/')
.post((req, res) => {
    const data = req.body
    //Add a new user when signing up
    Users.create(data, (err, response) => {
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(response)
        }
    })
})
.get((req, res) => {
    // Only for Testing
    Users.
    find({}).
    populate('peopleFollUser').
    populate('peopleUserFoll').
    populate("asking").
    exec((err, results) => {
        if(err) res.status(400).send(err)
        else res.status(200).send(results)
    })
})

// Follow a User

usersRouter.route('/:wantedId')
.put((req, res) => {
    const data = req.body
    Users.updateOne({"_id" : req.params.wantedId} , {$addToSet: { peopleFollUser : [data.asker]}} , (err, result) => {
        if(err){
            res.status(406).send(err)
        }else{
            Users.updateOne({"_id": data.asker}, {$addToSet: {peopleUserFoll: [req.params.wantedId]}}, (err, results) => {
                if(err) res.status(406).send(err)
                else res.status(200).send(results)
            })
        }
    })
})

// Ask to follow

usersRouter.route('/ask/:wantedId')
.put((req, res) => {

    Users.updateOne({"_id": req.params.wantedId}, {$addToSet: { asking : [req.body.asker]}},  (err, results) => {
        if (err) res.status(406).send(err)
        else res.status(200).send(results)
    })
})


// Accept the Asks for Following

usersRouter.route('/accept/:wantedId')
.put((req, res) => {

    // Add the asker to list of people following the user
    Users.updateOne({"_id": req.params.wantedId}, {$addToSet: { peopleFollUser : [req.body.asker]}}, (err, results) => {
        if(err) res.status(406).send(err)
        else{

            // Add the Receiver to list of people the asker follow
            Users.updateOne({"_id": req.body.asker}, {$addToSet: {peopleUserFoll: [req.params.wantedId]}}, (err, resul) => {
                if(err) res.status(406).send(err)
                else {
                    
                    // Remove the asker from list of asking
                    Users.updateOne({ '_id' : req.params.wantedId}, {$pull: {"asking": req.body.asker}}, (err, resull) => {
                        if(err) {
                            res.status(406).send(err)
                        }
                        else {
                            res.status(200).send(resull)
                        }
                    })
                }
            })
        }
    })
})

export default usersRouter
