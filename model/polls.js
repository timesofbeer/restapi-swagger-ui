const mongoose = require('mongoose');
const polls = {
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    question:String,
    options:[{}],
    voted : [{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    reateAt: {type:String,default:Date.now},
}

var pollSchema = new mongoose.Schema(polls);

module.exports=mongoose.model('Polls',pollSchema);