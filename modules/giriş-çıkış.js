const mongoose = require("mongoose")

const schema = mongoose.Schema({
    sunucu: String,
    kanal: String,
})

module.exports = mongoose.model("giriscikis", schema)