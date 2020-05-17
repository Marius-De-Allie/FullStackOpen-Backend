
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

// model
const Blog = require('./models/blogs')

mongoose.connect('mongodb+srv://fullstack:Fullstack@cluster0-ml26d.mongodb.net/bloglist?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
        console.log('CONNECTED TO DB')
    })
    .catch(e => {
        console.log('NOT CONNECTED TO DB')
        
    })
    
    
// Use router.
app.use('/api', blogsRouter)

// use cors
app.use(cors)

module.exports = app


