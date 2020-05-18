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

describe('blog api', () => {
    test('returns blogs as json and returns correct number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
        expect(response.headers['content-type']).toContain('application/json')
    })

    test('each blog returns id property', async () => {
        const response = await api.get('/api/blogs')
        const item = response.body[0];
        expect(item.id).toBeDefined()
    })

    test('a new blog can be added', async () => {

        const newBlog = {
            title: 'Other Blog',
            author: 'Mr. Author',
            url: 'https://www.myurl.com',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
    
    
    afterAll(() => {
        mongoose.connection.close()
    });
});    