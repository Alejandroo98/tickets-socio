const Router = require("express");
const ticketController = require("../controllers/tickets.controllers.js");
const router= Router();

router.get('/',ticketController.getIndex)

module.exports = router;