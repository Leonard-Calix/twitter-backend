const { Router } = require("express");
const { findAll, create, remove } = require("../controllers/trend.controller");
const { validateJWT } = require("../middleware/validate-jwt");
const router = Router();

router.use( validateJWT );

router.post('/', create);
router.get('/', findAll);
router.delete('/:trendId', remove);

module.exports = router;