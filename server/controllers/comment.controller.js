const Comment = require("../models/comment.model");

const jwt = require("jsonwebtoken");
const Shoe = require("../models/sole.model");

const addNewComment = async (req, res) => {
    const {body, params} = req;
    let newComment = new Comment(body);
    newComment.shoe_id = params.shoeId;
    console.log("Comment doc after adding shoe id", newComment);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
    newComment.user_id = decodedJwt.payload.id;
    console.log("After adding post and user id to comment doc", newComment);

    try{
        newComment = await newComment.save();
        postQuery = await Shoe.findByIdAndUpdate(
            {_id: params.shoeId},
            { $push: {comments: newComment._id } },
            { new: true, useFindAndModify: true }
        );
        res.json({ newComment, postQuery });
    } catch (error) {
        res.status(400).json(error);
        return;
    }
}

module.exports ={
    addNewComment
}