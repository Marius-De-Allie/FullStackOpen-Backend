// Mongoose
const mongoose = require('mongoose')

// cors
const cors = require('cors')

// Router
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// EXPRESS
const express = require('express')
require('express-async-errors')
const app = express();

// body-parser
const bodyParser = require('body-parser')

// dotenv
const config = require('./utils/config')

// logger
const logger  = require('./utils/logger')

const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false })
.then(() => {
        logger.info('CONNECTED TO DB')
    })
    .catch(e => {
        logger.error('UNABLE TO CONNECT TO DB', e.message)
    })

app.use(bodyParser.json())
    
// Use router.
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// use cors
app.use(cors)

// app.use(middleware.requestLogger)
// app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


