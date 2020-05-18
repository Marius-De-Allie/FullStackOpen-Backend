const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Blog One',
        author: 'Mr. Blog',
        url: 'https://www.blog-one.com',
        likes: 10
    },
    {
        title: 'Blog Two',
        author: 'Mrs. Blog',
        url: 'https://www.blog-two.com',
        likes: 13
    }
];

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray)
})

    
test('blogs api returns blogs as json and returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
    expect(response.headers['content-type']).toContain('application/json')
})


afterAll(() => {
    mongoose.connection.close()
});