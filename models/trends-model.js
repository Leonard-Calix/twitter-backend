const { model, Schema } = require('mongoose');

const schema = Schema({
    title: String,
    commentCount: String,
    hashtag: {
        type: Schema.Types.ObjectId,
        ref: 'Hashtag'
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Trend', schema);
