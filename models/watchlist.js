// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var watchlistSchema = new Schema({
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
    items: [{ type: Schema.ObjectId, ref: 'TradeSignal' }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Watchlist = mongoose.model('Watchlist', watchlistSchema);

// make this available to our Node applications
module.exports = Watchlist;