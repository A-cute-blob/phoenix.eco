  
const mongoose = require('mongoose');

const eco = new mongoose.Schema({
    userId: String,
    wallet: Number,
    coinsInBank: Number,
    bankSpace: Number
});

module.exports = mongoose.model('currency', eco);
