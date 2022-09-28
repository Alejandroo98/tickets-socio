import { Router } from "express";
import * as clientController from '../controllers/client.controller.js'
const router = Router();


router.get('/register',clientController.getRegister);
router.get('/',clientController.getIndex);
router.get('/login',clientController.getLogin);

router.post('/login',clientController.postLogin);

router.post('/register/new',clientController.postClient)

export default router;