// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var PriceHistory = require('./priceHistory');

// create a schema
var securitySchema = new Schema({
    /*securityId: {
        type: Number,
        required: true,
        unique: true
    },*/
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    category: {
        type: String
    },
    label: {
        type: String
    },
    lastPrice: {
        type: Number
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Security = mongoose.model('Security', securitySchema);

// make this available to our Node applications
module.exports = Security;