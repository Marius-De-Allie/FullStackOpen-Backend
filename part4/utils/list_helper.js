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

module.exports = {
    dummy,
    totalLikes
}