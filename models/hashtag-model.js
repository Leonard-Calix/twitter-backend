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
    }
});

module.exports = model('Hashtag', schema);
