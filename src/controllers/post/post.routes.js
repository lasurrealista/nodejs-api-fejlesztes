const express = require('express');
const controller = require('./post.controller');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    return controller.findOne(req, res, next);
});

router.post('/', (req, res, next) => {
    return controller.create(req, res, next);
});

module.exports = router;
