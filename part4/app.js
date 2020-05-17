// Mongoose
const mongoose = require('mongoose')

// cors
const cors = require('cors')

// Router
const blogsRouter = require('./controllers/blogs')

// EXPRESS
const express = require('express')
const app = express();

// body-parser
const bodyParser = require('body-parser')

// dotenv
const config = require('./utils/config')

// logger
const logger  = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
        logger.info('CONNECTED TO DB')
    })
    .catch(e => {
        logger.error('UNABLE TO CONNECT TO DB', e.message)
    })

app.use(bodyParser.json())
    
// Use router.
app.use('/api/blogs', blogsRouter)

// use cors
app.use(cors)

module.exports = app


