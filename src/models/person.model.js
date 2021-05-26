const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
