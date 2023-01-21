const mongoose = require('mongoose');

const calculateSchema = mongoose.Schema({
    annualInstalmentAmount : {type : Number, required : true},
    annualInterestRate : { type: Number, required: true},
    totalNumberofYears : { type: Number, required: true },
}, {
    versionKey : false,
    timestamps : true
});

const CalculateModel = mongoose.model('calculate', calculateSchema);
module.exports = { CalculateModel };