const Post = require('../../models/post.model');

exports.create = postData => {
    const post = new Post(postData);
    return post.save();
}
