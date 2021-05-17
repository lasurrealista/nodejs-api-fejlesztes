const Person = require('../../models/person.model');

exports.create = personData => {
    const person = new Person(personData);
    return person.save();
};

exports.findAll = () => Person.find();

exports.findOne = id => Person.findById(id);

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Person.findByIdAndRemove(id);