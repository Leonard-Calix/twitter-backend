const { response, request } = require("express")
const Hashtag = require("../models/hashtag-model")

const findAll = async (req = request, res = response) => {

    const { id } = req;
    const hashtags = await Hashtag.find({ user: id }).populate('user', 'name userName');
    res.status(200).json(hashtags);

}

const create = async (req = request, res = response) => {

    const hashtag = new Hashtag(req.body);
    hashtag.user = req.id;
    await hashtag.save();
    res.status(201).json(hashtag);
}

const remove = async (req = request, res = response) => {

    try {

        const { id } = req;

        const existHastag = await Hashtag.findById(req.params.hashtagId);

        if (!existHastag) {
            return res.status(404).json({
                ok: false,
                msg: 'NO se encontro el recurso'
            });
        }
        
        if (String(existHastag.user) !== id) {
            return res.status(404).json({
                ok: false,
                msg: 'NO tiene permiso'
            });
        }

        await existHastag.remove();

        return res.status(200).json({
            ok: true,
            msg: 'Eliminado con exito'
        });

    } catch (error) {

    }


}

module.exports = {
    create, findAll, remove
}