const mongoose = require("mongoose");


const ShoeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Shoe Name is required."],
        minLength: [3, "Shoe Name must be at least 3 characters."]
    },
    size:{
        type: String,
        required: [true, "Shoe size is required."],
    },
    color:{
        type: String,
        required: [true, "Shoe color is required."],
        minlength: [3, "Shoe color must be at least 3 characters."]
    },
    condition:{
        type: String,
        required: [true, "Shoe condition is required."],
    },
    description:{
        type: String,
        required: [true, "Shoe description is required."],
        minLength: [5, "Shoe description must be at least 5 characters long."]
    },
    price:{
        type: Number,
        required: [true, "Shoe Price is required."]
    },
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
}, {timestamps: true})

const Shoe = mongoose.model('Shoe', ShoeSchema);

module.exports = Shoe;