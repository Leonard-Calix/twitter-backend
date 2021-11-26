const { request, response } = require("express");
const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {

    const { userName, email, password, } = req.body;

    try {

        const existMail = await userModel.findOne({ email });

        if (existMail) {
            return res.json({
                msg: 'Ya esta en uso ese correo',
                ok: false
            });
        }

        const exitsUserName = await userModel.findOne({ userName });

        if (exitsUserName) {
            return res.json({
                msg: 'Ya esta en uso ese nombre de usuario',
                ok: false
            });
        }

        const salt = bcrypt.genSaltSync();

        const user = new userModel(req.body);

        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.userName);

        res.status(200).json({
            msg: 'Registro completado',
            ok: true,
            uid: user.id,
            userName: user.userName,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: error,
            ok: false
        });
    }
}

const findAll = async (req = request, res = response) => {

    try {
        const user = await userModel.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ mensaje: error });
    }
}

const validarEmail = async (req = request, res = response) => {

    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(500).json({
                msg: 'El nombre de usuario no existe',
                ok: false
            });
        }

        res.status(200).json({
            ok: true,
            id: user.id,
            email: user.email
        });

    } catch (error) {
        return res.status(500).json({
            msg: error,
            ok: false
        });
    }
}

const validarPassword = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(500).json({
                msg: 'El nombre de usuario no existe',
                ok: false
            });
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(500).json({
                msg: 'Contraseña invalida',
                ok: false
            });
        }

        const token = await generateJWT(user.id, user.userName);

        res.json({
            ok: true,
            id: user.id,
            userName: user.userName,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: error,
            ok: false
        });
    }
}

module.exports = {
    createUser,
    findAll,
    validarEmail,
    validarPassword
}
