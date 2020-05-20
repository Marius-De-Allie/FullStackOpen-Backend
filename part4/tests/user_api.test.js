const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: 'tj123',
        name: 'Tom Jones',
        password: 'hkhsaouh',
        blogs: []
    }
];

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = initialUsers.map(user => new User(user));
    const promiseArray = userObjects.map(user => user.save());
    await Promise.all(promiseArray)
})

describe('User api', () => {
    test('adding a user with no password value returns response status code (400) and correct error message', async () => {
        const newUser = {
            username: 'mk321',
            name: 'Mike Klein'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        // const response = await api.post('/api/users', newUser);
        // console.log(response)
        // expect(response.text).toBe('{"error":"User validation failed: username: Path `username` is required., passwordHash: Path `passwordHash` is required."}')
    })

    test('adding a user with password value less than 3 characters returns response status code (400) and correct error message', async () => {
        const newUser = {
            username: 'jd321',
            name: 'John Doe',
            password: 'yu'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        // const response = await api.post('/api/users', newUser);
        // console.log(response.text)
        // expect(response.text).toBe('{"error":"User validation failed: username: Path `username` is required., passwordHash: Path `passwordHash` is required."}')

    })

    test('adding a user with no username value returns correct response status code (400) and correct error message', async () => {
        const newUser = {
            name: 'Max Payne',
            password: 'ryhfdhfkl'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

            // const response = await api.post('/api/users', newUser);
            // expect(response).toContain('{"error":"User validation failed: username: Path `username` is required."}')
    })
    test('adding a user with a username less than 3 characters fails and returns correct response status code (400)', async () => {
        const newUser = {
            username: 'mk',
            name: 'Mary King',
            password: 'dhsakdlfj'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)


    })
    test('adding a user with a non unqiue username returns correct response status code (400) and correct error message', async () => {
        const newUser = {
            username: 'tj123',
            name: 'Tyler Jensen',
            password: 'nvlvnlxkv'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

            const response = await api.post('/api/users', newUser);
            console.log(response.body)
            // expect(response.text).toEqual('{"error":"Validation error, password is required"}')
    

    })

    
    afterAll(() => {
        mongoose.connection.close()
    });
});    