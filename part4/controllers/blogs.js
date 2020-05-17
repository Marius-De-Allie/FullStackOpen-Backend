const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blogs')

  const mongoUrl = process.env.MONGODB_URI
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  
//   app.use(cors())
//   app.use(express.json())
  
  blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter
  