
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

/**
 * @swagger
 * /api/student/info:
 *   get:
 *     tags:
 *      - Student
 *     summary: Get Student info by email
 *     description:  Get Student info by email
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The email to get student
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/student/info", StudentController.getStudentInfoByEmail);

/**
 * @swagger
 * /api/student/{student_id}:
 *   get:
 *     tags:
 *      - Student
 *     summary: Get student by student_id
 *     description: Get student by student_id
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student 
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns student
 *       500:
 *         description: Internal server error
 */
router.get("/api/student/:student_id", StudentController.getStudentByStudentId);

// *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *                 description: The file to upload.
//  *               note:
//  *                 type: string
//  *                 description: Description of file contents.

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
 *         multipart/form-data:
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
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
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
router.post("/api/event/insert",upload.single('file'), EventController.admInsertEvent);

/**
 * @swagger
 * /api/event/search:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get events by name
 *     description: Get all event list whose event name contains keyword 
 *     parameters:
 *       - name: name
 *         in: query
 *         description: The name to find event
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         description: 1 for active, 0 for all
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/event/search", EventController.getEventsByName);

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
 *           type: number
 *       - name: status
 *         in: query
 *         description: 1 for active, 0 for all
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns the events for the specified campus
 *       404:
 *         description: Campus not found
 *       500:
 *         description: Internal server error
 */
router.get("/api/event/:campus_id", EventController.getAllEventsInCampus);

/**
 * @swagger
 * /api/event/:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get all events 
 *     description: Get all event 
 *     parameters:
 *       - name: status
 *         in: query
 *         description: 1 for active, 0 for all
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/event", EventController.getAllEvents);

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
router.post("/api/event/organizer", EventController.admInsertEventOrganizer);

/**
 * @swagger
 * /api/event/join:
 *   post:
 *     tags:
 *      - Event
 *     summary: Students register for the event
 *     description: Students register for the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: number
 *               student_id:
 *                 type: number
 *               registration_date:
 *                 type: string
 *                 example: yyyy-dd-mm HH-MM-SS
 *             required:
 *               - event_id
 *               - registration_date
 *               - student_id
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: This student is not a club member
 */
router.post("/api/event/join", EventController.registerEvent);

/**
 * @swagger
 * /api/event/join/{event_id}:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get students join event
 *     description: Get all students join event by event_id
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event to get student join
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/event/join/:event_id", EventController.getStudentsJoinEvent);

/**
 * @swagger
 * /api/club/campus/{campus_id}:
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
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/club/campus/:campus_id", ClubController.getAllClubsInCampus);

/**
 * @swagger
 * /api/club/student/{student_id}:
 *   get:
 *     tags:
 *      - Club
 *     summary: Get clubs that student joined
 *     description: Get clubs that student joined
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student 
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/club/student/:student_id", ClubController.getAllClubsStudentJoin);

/**
 * @swagger
 * /api/club/member:
 *   get:
 *     tags:
 *      - Club
 *     summary: Get all members of club
 *     description: Get all members of club
 *     parameters:
 *       - name: club_id
 *         in: query
 *         description: ID of the club 
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/club/member", ClubController.getAllClubMembers);

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
 *                      campus:
 *                        type: string
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
