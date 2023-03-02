
import * as CampusController from '../controller/campus/CampusController';
import * as StudentLoginController from '../controller/student/StudentLoginController';
import * as StudentController from '../controller/student/StudentController';
import * as EventController from '../controller/event/EventController';
import * as ClubController from '../controller/club/ClubController';
import * as FirebaseController from '../controller/firebaseController';
import { isAuth } from '../middleware/Auth';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
dotenv.config();
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.IMAGE_UPLOAD_PATH as string);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

/**
 * @swagger
 *  /api/campus:
 *    get:
 *         tags:
 *          - Campus
 *         security:
 *          - bearerAuth: []
 *         summary: This api is used to check if get method is available or not.
 *         description: This api is used to check if get method is available or not.
 *         responses:
 *             200:
 *                description: To test get method is available.
 */
router.get("/api/campus", isAuth, CampusController.getAllListCampus);

router.get("/api/student/info", StudentController.getStudentInfoByEmail);
/**
 * @swagger
 * /api/event/insert:
 *   post:
 *     tags:
 *      - Event
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

/**
 * @swagger
 * /api/event/{campus_id}:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get events by campus_id
 *     description: Get events for a specific campus
 *     parameters:
 *       - name: campus_id
 *         in: path
 *         description: ID of the campus to get events for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the events for the specified campus
 *       404:
 *         description: Campus not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/event:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get events by name
 *     description: Get all event list whose event name contains keyword 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/event/organizer:
 *   post:
 *     tags:
 *      - Event
 *     summary: Set organizer for event
 *     description: Set organizer for event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: number
 *               club_id:
 *                 type: number
 *               student_id:
 *                 type: number
 *             required:
 *               - event_id
 *               - club_id
 *               - student_id
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: This student is not a club member
 */
router.post("/api/event/insert", EventController.admInsertEvent);
router.get("/api/event/:campus_id", EventController.getAllEventsInCampus);
router.get("/api/event", EventController.getEventsByName);
router.post("/api/event/organizer", EventController.admInsertEventOrganizer);
/**
 * @swagger
 * /api/club/{campus_id}:
 *   get:
 *     tags:
 *      - Club
 *     summary: Get clubs by campus_id
 *     description: Get all clubs in specific campus
 *     parameters:
 *       - name: campus_id
 *         in: path
 *         description: ID of the campus to get clubs in
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/club/member:
 *   post:
 *     tags:
 *      - Club
 *     summary: Add student into Club
 *     description: Add student into Club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: number
 *               club_id:
 *                 type: number
 *               role:
 *                 type: string
 *               join_date:
 *                 type: string
 *             required:
 *               - student_id
 *               - club_id
 *               - role
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/club/:campus_id", ClubController.getAllClubsInCampus);
router.post("/api/club/member", ClubController.insertClubMember)
/**
 * @swagger
 * /api/login:
 *    post:
 *      tags:
 *          - Authorization
 *      summary: Log in to the system
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                role:
 *                  type: string  
 *                  example: "admin/members" 
 * 
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  access_token:
 *                    type: string
 *                  refresh_token:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      role:
 *                        type: string
 *                      email:
 *                        type: string
 *                        example: "customer@fpt.edu.vn"
 *                      phone:
 *                        type: string
 *                        example: "0382212012"
 */
router.post("/api/login", StudentLoginController.handleLogin);


/**
 * @swagger
 * /notifications:
 *    post:
 *      tags:
 *          - Notification Service
 *      summary: Create notifications
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                send_option:
 *                  type: string
 *                  example: "topic/device"
 *                device_token:
 *                  type: string  
 *                topic:
 *                  type: string
 *                  example: "my-topic"
 *                title:
 *                  type: string
 *                  required: true
 *                content:
 *                  type: string
 *                  required: true
 * 
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Bad request  
 *        500:
 *          description: Internal server error
 *      produces:
 *       - application/json
 *      consumes:
 *       - application/json
 */
router.post('/notifications', FirebaseController.handlepushNotification);


/**
 * @swagger
 * /images:
 *   post:
 *     summary: Save files
 *     tags: [Services]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *               note:
 *                 type: string
 *                 description: Description of file contents.
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "https://storage.googleapis.com/wallet-fpt.appspot.com/avatar.png?GoogleAccessId=firebase-adminsdk..."
 *                 message:
 *                   type: string
 *                   example: "Successfully uploaded image"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/images',upload.single('file'), FirebaseController.handlePostFile);

export { router };
