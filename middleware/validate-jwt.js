const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, netx) => {
    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {

        const payload = jwt.verify(token, 'palabrasecreta');

        const { id, userName } = payload;

        req.id = id;
        req.userName = userName;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
    }

    netx();
}

module.exports = {
    validateJWT
}