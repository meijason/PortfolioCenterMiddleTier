// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var signalSchema = new Schema({
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
    rules: [{ type: Schema.ObjectId, ref: 'Rule' }]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Signal = mongoose.model('Signal', signalSchema);

// make this available to our Node applications
module.exports = Signal;