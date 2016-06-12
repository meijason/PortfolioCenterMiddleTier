// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var watchlistItemSchema = new Schema({
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
    },
    rules: [{ type: Schema.ObjectId, ref: 'Signal' }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var WatchlistItem = mongoose.model('WatchlistItem', watchlistItemSchema);

// make this available to our Node applications
module.exports = WatchlistItem;