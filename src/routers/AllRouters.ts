
import * as CampusController from '../controller/campus/CampusController';
import * as StudentLoginController from '../controller/student/StudentLoginController';
import * as StudentController from '../controller/student/StudentController';
import * as EventController from '../controller/event/EventController';
import { isAuth } from '../middleware/Auth';
import express from 'express';
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

router.get('/api/student/info', StudentController.getStudentInfoByEmail);
/**
 * @swagger
 * /api/eventInsert:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event with the specified parameters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               point:
 *                 type: number
 *               img: 
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               date:
 *                 type: string      
 *             required:
 *               - name
 *               - email
 *               - point
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.post('/api/eventInsert', EventController.admInsertEvent);



/**
 * @swagger
 * /api/login:
 *    post:
 *      tags:
 *          - Authorization
 *      summary: Log in to the system
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *      responses:
 *        200:
 *          description: OK
 *          schema:
 *            type: object
 *            properties:
 *                access_token:
 *                  type: string
 *                refresh_token:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                          example: "customer@fpt.edu.vn"
 *                      phone:
 *                          type: string
 *                          example: "0382212012"
 */
router.post('/api/login', StudentLoginController.handleLogin);

export { router };