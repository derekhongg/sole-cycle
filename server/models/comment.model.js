const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    text: {
        type: String, 
        required: [true, "Text is required for the comment"],
        minLength: [3, "Minimum 3 characters are required for the comment."]
    },
    shoe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);