const mongoose = require ('mongoose')
const poemModel = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    },

    isCompleted:{
        type:Boolean,
        required:true
    }
})

const poemmodel = mongoose.model("poem",poemModel)
module.exports = poemmodel