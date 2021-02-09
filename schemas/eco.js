  
const mongoose = require('mongoose');

const eco = new mongoose.Schema({
    userId: String,
    coinsInWallet: Number,
    coinsInBank: Number,
    bankSpace: Number
});

module.exports = mongoose.model('currency', eco);
