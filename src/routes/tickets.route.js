import { Router } from "express";
import * as ticketController from '../controllers/tickets.controllers.js'
const router= Router();

router.get('/',ticketController.getIndex)

export default router;