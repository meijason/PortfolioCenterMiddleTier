// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ruleSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    result: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

ruleSchema.virtual('compute').set(function (calculator) {
  return calculator.compute();
});

// the schema is useless so far
// we need to create a model using it
var Rule = mongoose.model('Favorites', ruleSchema);

// make this available to our Node applications
module.exports = Rule;