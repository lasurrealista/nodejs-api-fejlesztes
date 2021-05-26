const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
}, {
    timestamps: true
});

PostSchema.plugin(idValidator);

module.exports = mongoose.model('Post', PostSchema);
