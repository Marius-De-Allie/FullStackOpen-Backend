const listHelper = require('../utils/list_helper');

describe('favourite blog', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ];
    
      const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5ebe0a643b214d4fc4e03b0a',
          title: 'MERN stack is the best stack!',
          author: 'Dane Lennon',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/MERN_stack_is_the_best_stack.html',
          likes: 8,
          __v: 0
        }

      ];

    test('of empty list is undefined', () => {
        expect(listHelper.favouriteBlog([])).toBe(undefined)
    });

    test('when list has only one blog equals that blog', () => {
        expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    });

    test('when list has more than one blog equals correct blog', () => {
        expect(listHelper.favouriteBlog(listWithMultipleBlogs)).toEqual({
            title: 'MERN stack is the best stack!',
            author: 'Dane Lennon',
            likes: 8
        })
    });

})
