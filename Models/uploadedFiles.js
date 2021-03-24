const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uploadedFilesSchema = new Schema({
    name:{
        type: String,
    },    
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("uploaded-files", uploadedFilesSchema);