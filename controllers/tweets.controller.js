const { response, request } = require("express")
const tweetsModel = require("../models/tweets-model")

const findAll = async (req = request, res = response) => {

    const { id } = req;
    const tweets = await tweetsModel.find({ user: id }).populate('user', 'name userName');
    res.status(200).json(tweets);

}

const create = async (req = request, res = response) => {
    
    const tweet = new tweetsModel(req.body);
    tweet.user = req.id;
    await tweet.save();
    res.status(201).json(tweet);
}

module.exports = {
    create, findAll
}