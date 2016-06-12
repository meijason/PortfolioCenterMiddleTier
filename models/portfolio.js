// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Security = require('./security');


// create a schema
var portfolioSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{ type: Schema.ObjectId, ref: 'Security' }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Portfolio = mongoose.model('Portfolio', portfolioSchema);

// make this available to our Node applications
module.exports = Portfolio;