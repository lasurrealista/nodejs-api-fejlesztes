const createError = require('http-errors');
const logger = require('../../config/logger');
const postService = require('./post.service');

exports.create = (req, res, next) => {
    const { title, body, author_id } = req.body;
    if (!title || !body || author_id) {
        return next(new createError.BadRequest('No title, body or author_id!'));
    }

    const postData = { 
        title, 
        body, 
        authorId: author_id 
    };

    return postService.create(postData)
        .then( createdPost => {
            res.status(201);
            res.json(createdPost);
        })
        .catch( err => next( new createError.BadRequest(err.message)) );
}
