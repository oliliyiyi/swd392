
import * as CampusController from '../controller/campus/CampusController';
import * as StudentLoginController from '../controller/student/StudentLoginController';
import { verifyToken } from '../middleware/Auth';
const express = require('express');
const router = express.Router();


/**
 * @swagger
 *  /api/campus:
 *    get:
 *         summary: This api is used to check if get method is available or not.
 *         description: This api is used to check if get method is available or not.
 *         responses:
 *             200:
 *                description: To test get method is available.
 */

router.get('/api/campus', verifyToken, CampusController.getAllListCampus);

router.post('/api/login', StudentLoginController.loginAcountStudent);

export { router };