const express = require('express');
const data = require('./data');
const createError = require('http-errors');

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data);
});

// Get one person.
controller.get('/:id', (req, res, next) => {
    const person = data.find(p => p.id === Number(req.params.id));
    if (!person) {
        return next(new createError.NotFound("Person is not found"));
    }
    res.json(person);
});

// Create a new person.
controller.post('/', (req, res, next) => {
    const { last_name, first_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson);
});

// Update a person.
controller.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const index = data.findIndex(p => p.id === Number(id));
    const { first_name, last_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    data[index] = {
        id,
        first_name,
        last_name,
        email
    };

    res.json(data[index]);
});

// Delete a person.
controller.delete('/:id', (req, res, next) => {
    const index = data.findIndex(p => p.id === Number(req.params.id));
    if (index === -1) {
        return next(new createError.NotFound("Person is not found"));
    }
    data.splice(index, 1);
    res.json({});
});

module.exports = controller;
