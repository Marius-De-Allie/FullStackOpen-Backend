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

    test('a new blog is missing the likes property, add likes default value of 0', async () => {
    
        const newBlog = {
            title: 'Great Blog',
            author: 'Author Reed',
            url: 'https://www.greatblog.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)

        const response = await api.get('/api/blogs')

        const addedBlog = response.body.filter(blog => blog.title === newBlog.title)
        expect(addedBlog[0].likes).toBe(0)
    })

    test('a new blog is missing the title and url properties, return response status code 400', async () => {
    
        const newBlog = {
            author: 'Jay Toms',
            likes: 20
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('a blog with a valid id is removed from blogs', async () => {
        const  response = await api.get('/api/blogs');
        const blogsAtStart = response.body;
        const id = blogsAtStart[0].id

        await api
            .delete(`/api/blogs/${id}`)
            expect(204)

        const res = await api.get('/api/blogs/');
        const blogsAtEnd = res.body;

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)

        const ids = blogsAtEnd.map(blog => blog.id);
        
        expect(ids).not.toContain(id)
    })
    
    
    afterAll(() => {
        mongoose.connection.close()
    });
});    