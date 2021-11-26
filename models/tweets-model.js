const { model, Schema } = require('mongoose');

const schema = Schema({
    comment: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    },
    img: String,
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = model('Tweet', schema);
