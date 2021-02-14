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

export default usersRouter
