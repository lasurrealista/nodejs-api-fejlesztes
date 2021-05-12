const express = require('express');
const data = require('./data');

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data);
});

// Create a new person.
controller.post('/', (req, res) => {
    const newPerson = req.body;
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);

    res.status(201);
    res.json(newPerson);
});

// Update a person.
controller.put('/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(p => p.id === Number(id));
    const {first_name, last_name, email} = req.body;

    data[index] = {
        id,
        first_name,
        last_name,
        email
    };

    res.json(data[index]);
});

module.exports = controller;
