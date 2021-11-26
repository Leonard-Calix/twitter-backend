const { Router } = require("express");
const { findAll, create } = require("../controllers/tweets.controller");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();

router.use( validateJWT );

router.post('/', create);
router.get('/', findAll);

module.exports = router;