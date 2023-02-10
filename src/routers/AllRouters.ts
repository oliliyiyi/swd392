import express from 'express';
import * as CampusController from '../controller/campus/CampusController';

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

router.get('/api/campus', CampusController.getAllListCampus);


export { router };