const dummy = blog => 1;

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum += item.likes
    }
    return blogs.reduce(reducer, 0)
    // let total;
    // blogs.forEach(blog => {
    //     total += blog.likes
    // })
    // return total;
}

const favouriteBlog = blogs => {
    let mostLiked = {likes: 0};

    blogs.map(blog => {
        if(blog.likes >= mostLiked.likes) {
            mostLiked = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        } else {
            // do nothing
        }
    })

    return mostLiked.likes ===  0 ? undefined : mostLiked;
}

const mostLikes = blogs => {
    let author;
    let mostLikes = 0;

    blogs.forEach(blog => {
        if(blog.likes >= mostLikes) {
            author = blog.author,
            mostLikes = blog.likes
        } else {
            // Do nothing.
        }
    });
    return {
        author,
        likes: mostLikes
    }
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostLikes
}
