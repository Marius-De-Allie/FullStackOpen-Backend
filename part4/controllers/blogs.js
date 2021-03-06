const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/',  async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    let token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    // const users = await User.find({})
    // const user = await User.findById(body.userId || users[0]._id)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    let {id} = request.params;
    let token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken) 
    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const selBlog = await Blog.find({_id: request.params.id});
    if(selBlog[0].user.toString() === user._id.toString()) {
        try {
            const result = await Blog.findByIdAndRemove(id)
            response.status(204).end()
        } catch(exception) {
            next(exception)
        }
    } else {
        return response.status(401).json({error: 'Not authorized to delete this item'});
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
  
    const blog = {
      ...request.body
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
  })

module.exports = blogsRouter

