// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceHistorySchema = new Schema({
    asOfDate: {
        type: Date,
        required: true
    },
    close:  {
        type: Number,
        required: true
    },
    adjustedClose:  {
        type: Number,
        required: true
    },
    open:  {
        type: Number,
        required: true
    },
    adjustedopen:  {
        type: Number,
        required: true
    },
    high:  {
        type: Number,
        required: true
    },
    adjustedhigh:  {
        type: Number,
        required: true
    },
    low:  {
        type: Number,
        required: true
    },
    adjustedlow:  {
        type: Number,
        required: true
    },
    volume:  {
        type: Number,
        required: false
    },
    securityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Security'
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);

// make this available to our Node applications
module.exports = PriceHistory;