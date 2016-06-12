// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var portfolioItemSchema = new Schema({
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
    security: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Security'
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

// make this available to our Node applications
module.exports = PortfolioItem;