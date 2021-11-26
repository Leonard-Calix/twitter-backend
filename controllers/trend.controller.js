const { response, request } = require("express")
const Trend = require("../models/trends-model")

const findAll = async (req = request, res = response) => {

    const { id } = req;
    const trends = await Trend.find({ user: id }).populate('hashtag');
    res.status(200).json(trends);

}

const create = async (req = request, res = response) => {

    const trend = new Trend(req.body);
    await trend.save();
    res.status(201).json(trend);
}

const remove = async (req = request, res = response) => {

    try {

        const { id } = req;

        const existTrend = await Trend.findById(req.params.trendId);

        if (!existTrend) {
            return res.status(404).json({
                ok: false,
                msg: 'NO se encontro el recurso'
            });
        }
        
        // if (String(existTrend.user) !== id) {
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'NO tiene permiso'
        //     });
        // }

        await existTrend.remove();

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