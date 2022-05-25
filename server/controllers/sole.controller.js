const { response } = require('express');
const Shoe = require('../models/sole.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const findAllShoes = async(req, res) => {
    try{
        const allShoes = await Shoe.find().populate({
            path: 'comments',
            model: "Comment",
            populate: {
                path: "user",
                model: "User",
            }
        }).exec();
        return res.json(allShoes);
    } catch (error) {
        console.log(error, "Error finding shoes");
        return res.status(400).json(error)
    }
}

const findOneShoe = (req, res) => {
    const {params} = req;
    Shoe.findOne({_id: params.id})
        .then((oneShoe) => res.json(oneShoe))
        .catch((err) => res.status(400).json(err))
};

const createNewShoe = async(req, res) => {
    const { body } = req;
    let newShoe = new Shoe(body);
    console.log(newShoe);
    console.log("New Shoe added id", newShoe);

    try {
        newShoe = await newShoe.save();
        return res.json(newShoe);
    } catch (error) {
        console.log("Error!", error);
        return res.status(400).json(error);
    }
    newShoe.user_id = decodedJwt.id;
    console.log("New post added", newShoe);
    res.json({msg: "Gets here"})
    // Shoe.create(body)
    //     .then((newShoe) => {
    //         console.log(newShoe);
    //         res.json(newShoe)})
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(400).json(err)
    //     })
};

const updateShoe = (req, res) => {
    Shoe.findOneAndUpdate({_id: req.params.id}, req.body, {
        new:true, 
        runValidators:true
    })
        .then(updatedShoe => {
            console.log(updatedShoe)
            res.json(updatedShoe)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        });
}

const findShoesByUser = (req, res) => {
    Shoe.find({userName:req.params.userName})
        .then((shoes) => {
            res.json(shoes)
        })
        .catch((err) => {
            res.json(err)
        })
};

const deleteShoe = (req, res) => {
    Shoe.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
    findAllShoes,
    updateShoe,
    createNewShoe,
    findOneShoe,
    findShoesByUser,
    deleteShoe
};