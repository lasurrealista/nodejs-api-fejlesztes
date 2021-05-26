const express = require('express');
const controller = require('./post.controller');

const router = express.Router();

router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

module.exports = router;
