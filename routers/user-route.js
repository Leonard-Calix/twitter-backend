const { Router } = require("express");
const {  validarEmail, createUser, validarPassword, findAll } = require("../controllers/user.controller");
const router = Router();

//router.use( validateJWT );

router.post('/', createUser);
router.get('/', findAll);
router.post('/validar-email', validarEmail);
router.post('/validar-password', validarPassword);

module.exports = router;