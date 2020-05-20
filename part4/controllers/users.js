const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body;
    console.log(body)
    if(!body.password) {
        return response.status(400).json({ error: 'Validation error, password required.'})
    } else if (body.password && body.password.length < 3) {
            return response.status(400).json({ error: 'Validation error, password is too short, must be atleast 3 characters long'})

    }
    


    const saltRounds = 10
    
    let passwordHash;
    if(body.password) {
        passwordHash = await bcrypt.hash(body.password, saltRounds)
    }

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    try {
        const savedUser = await user.save();
    
        response.json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter