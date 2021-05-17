const express = require('express');
const createError = require('http-errors');
const data = require('./data');
const Person = require('../../models/person.model');
const logger = require('../../config/logger');

const controller = express.Router();

controller.get('/', async (req, res) => {
    const people = await Person.find();
    logger.debug(`Get all people, returning ${people.length} items.`);
    res.json(people);
});

// Get one person.
controller.get('/:id', async (req, res, next) => {
    const person = await Person.findById(req.params.id);
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

    const newPerson = new Person({
        firstName: first_name,
        lastName: last_name,
        email: email
    });

    newPerson.save()
        .then(data => {
            res.status(201);
            res.json(data);
        });
});

// Update a person.
controller.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, email } = req.body;
    if (!last_name || !first_name || !email) {
        return next(
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    };

    let person = {};
    try {
        person = await Person.findByIdAndUpdate(id, update, {
            new: true,
            useFindAndModify: false
        });
    } catch (err) {
        return next(new createError.BadRequest(err));
    }

    return res.json(person);
});

// Delete a person.
controller.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const person = await Person.findByIdAndDelete(id);
    } catch (err) {
        return next(new createError.NotFound("Person is not found"));
    }
    res.json({});
});

module.exports = controller;
