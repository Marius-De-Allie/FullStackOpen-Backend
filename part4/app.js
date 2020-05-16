
// Mongoose
const mongoose = require('mongoose')

// cors
const cors = require('cors')

// Router
const blogsRouter = require('./controllers/blogs')

// EXPRESS
const express = require('express')
const app = express();

// dotenv
const config = require('dotenv').config()

mongoose.connect(config.process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// use cors
app.use(cors)

// Use router.
app.use('/api/blogs', blogsRouter)

module.exports = app


