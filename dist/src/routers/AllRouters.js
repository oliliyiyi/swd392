"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const CampusController = __importStar(require("../controller/campus/CampusController"));
const StudentLoginController = __importStar(require("../controller/student/StudentLoginController"));
const StudentController = __importStar(require("../controller/student/StudentController"));
const EventController = __importStar(require("../controller/event/EventController"));
const ClubController = __importStar(require("../controller/club/ClubController"));
const FirebaseController = __importStar(require("../controller/firebaseController"));
const NotifyController = __importStar(require("../controller/notify/NotifyController"));
const QrCodeController = __importStar(require("../controller/qrCode/QrCodeController"));
const Auth_1 = require("../middleware/Auth");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const router = express_1.default.Router();
exports.router = router;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMAGE_UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
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
router.get("/api/campus", Auth_1.isAuth, CampusController.getAllListCampus);
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
 * /api/student/point:
 *   get:
 *     tags:
 *      - Student
 *     summary: Get top 10 student maxpoint in campus
 *     description: Get top 10 student maxpoint in campus
 *     parameters:
 *       - name: campus_id
 *         in: query
 *         description: The campus_id to get top 10 student maxpoint
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/student/point", StudentController.getTopStudentsPointInCampus);
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
/**
 * @swagger
 * /api/student/{student_id}:
 *   put:
 *     tags:
 *      - Student
 *     summary: Update student information
 *     description: Update the phone, address, and/or birthday information for a student.
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student to update.
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Student information to update.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *               phone:
 *                 type: string
 *                 description: The updated phone number for the student.
 *               address:
 *                 type: string
 *                 description: The updated address for the student.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The updated birthday for the student (in YYYY-MM-DD format).
 *             example:
 *               phone: "123-456-7890"
 *               address: "123 Main St."
 *               birthday: "2000-01-01"
 *     responses:
 *       '200':
 *         description: Successfully updated student information.
 *       '404':
 *         description: Student with the given ID not found.
 */
router.put("/api/student/:student_id", upload.single('file'), StudentController.updateStudentInfo);
/**
 * @swagger
 *  /api/students:
 *    get:
 *         tags:
 *          - Student
 *         security:
 *          - bearerAuth: []
 *         summary: This api is used to get all student.
 *         description: This api is used to get all student.
 *         responses:
 *             200:
 *                description: To test get method is available.
 */
router.get("/api/students", Auth_1.isAuth, StudentController.getAllStudentInfo);
/**
 * @swagger
 * /api/student/{student_id}/point:
 *   get:
 *     tags:
 *      - Student
 *     summary: Get student point by student_id
 *     description: Get student point in semester by student_id
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns point of student
 *       500:
 *         description: Internal server error
 */
router.get("/api/student/:student_id/point", StudentController.getStudentPoint);
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
 *               club_id:
 *                 type: number
 *               student_id:
 *                 type: number
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               point:
 *                 type: number
 *               description:
 *                  type: string
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *             required:
 *               - name
 *               - club_id
 *               - student_id
 *               - email
 *               - point
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.post("/api/event/insert", upload.single('file'), EventController.admInsertEvent);
/**
 * @swagger
 * /api/event/{event_id}:
 *   put:
 *     tags:
 *      - Event
 *     summary: Admin approve event
 *     description: Admin approve event
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event to approve
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Successfully updated student information.
 *       '400':
 *         description: Action Fail.
 */
router.put("/api/event/:event_id", EventController.admApprovedEvent);
/**
 * @swagger
 * /api/event/detail/{event_id}:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get event by event_id
 *     description: Get event by event_id
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns event by event_id
 *       500:
 *         description: Internal server error
 */
router.get("/api/event/detail/:event_id", EventController.getEventById);
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
 *       - name: is_approved
 *         in: query
 *         description: 1 for avent is already approved, 0 for avent is not already approved,
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
 *       - name: is_approved
 *         in: query
 *         description: 1 for avent is already approved, 0 for avent is not already approved,
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
 * /api/event/{event_id}:
 *   delete:
 *     summary: Remove event
 *     description: Remove a event with the specified event_id.
 *     tags:
 *       - Event
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event to remove
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully removed the event
 *       400:
 *         description: Action Fail
 */
router.delete("/api/event/:event_id", EventController.deleteEvent);
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
 *                 example: yyyy-mm-dd HH-MM-SS
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
 * /api/event/join/{event_id}/checkin:
 *   put:
 *     tags:
 *      - Event
 *     summary: Student checkin event
 *     description: Student checkin to participate event
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event to checkin.
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: number
 *                 description: ID of the student.
 *               checkin:
 *                 type: string
 *                 format: date
 *                 description: checkin time (in YYYY-MM-DD format).
 *     responses:
 *       '200':
 *         description: Successfully updated student information.
 *       '400':
 *         description: Action Fail.
 */
router.put("/api/event/join/:event_id/checkin", EventController.checkinEvent);
/**
 * @swagger
 * /api/event/join/{event_id}/checkout:
 *   put:
 *     tags:
 *      - Event
 *     summary: Student checkout event
 *     description: Student checkout event
 *     parameters:
 *       - name: event_id
 *         in: path
 *         description: ID of the event to checkout.
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: number
 *                 description: ID of the student.
 *               checkout:
 *                 type: string
 *                 format: date
 *                 description: checkout time (in YYYY-MM-DD format).
 *     responses:
 *       '200':
 *         description: Successfully updated student information.
 *       '400':
 *         description: Action Fail.
 */
router.put("/api/event/join/:event_id/checkout", EventController.checkoutEvent);
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
 * /api/event/join/student/{student_id}:
 *   get:
 *     tags:
 *      - Event
 *     summary: Get events that student join
 *     description: Get all events that student join by student_id
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student to get event join
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/event/join/student/:student_id", EventController.getEventsStudentJoin);
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
 * /api/club/topEvent:
 *   get:
 *     tags:
 *      - Club
 *     summary: Get Top 5 club that have the most total event in semester
 *     description: Get Top 5 club that have the most total event in semester
 *     parameters:
 *       - name: campus_id
 *         in: query
 *         description: ID of the campus
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 */
router.get("/api/club/topEvent", ClubController.getTopClubsWithTheMostEvents);
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
 *               example: yyyy-mm-dd HH-MM-SS
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
router.post("/api/club/member", ClubController.insertClubMember);
/**
 * @swagger
 * /api/club/member/{student_id}:
 *   delete:
 *     summary: Remove a member from a club
 *     description: Remove a student with the given student_id from the club with the specified club_id.
 *     tags:
 *       - Club
 *     parameters:
 *       - name: student_id
 *         in: path
 *         description: ID of the student to remove from the club
 *         required: true
 *         schema:
 *           type: number
 *       - name: club_id
 *         in: query
 *         description: ID of the club to remove the student from
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             club_id:
 *               type: number
 *               description: ID of the club to remove the student from
 *     responses:
 *       200:
 *         description: Successfully removed the student from the club
 *       400:
 *         description: Action Fail
 */
router.delete("/api/club/member/:student_id", ClubController.deleteClubMember);
/**
 * @swagger
 * /api/club/detail/{club_id}:
 *   get:
 *     tags:
 *      - Club
 *     summary: Get club by club_id
 *     description: Get club by club_id
 *     parameters:
 *       - name: club_id
 *         in: path
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
router.get("/api/club/detail/:club_id", ClubController.getClubInfoByClubId);
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
 *                deviceToken:
 *                   type: string
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
 *                  device_tokens:
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
 *
 */
router.post("/api/login", StudentLoginController.handleLogin);
/**
 * @swagger
 * /api/notifications/student/{student_id}:
 *   get:
 *     tags:
 *      - Notification Service
 *     summary: Get notify that student haved
 *     description: Get notify that student haved
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
router.get("/api/notifications/student/:student_id", NotifyController.getStudentByStudentId);
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
 *     summary: Save file
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
router.post('/images', upload.single('file'), FirebaseController.handlePostFile);
/**
 * @swagger
 * /imagesQrCodeCheckin/event/{eventId}:
 *   get:
 *     summary: Save QrCode information
 *     tags: [Services]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         description: ID of the event
 *         required: true
 *         schema:
 *           type: number
 *       - name: status
 *         in: query
 *         description: 1 for checkout, 0 for checkin
 *         required: true
 *         schema:
 *           type: number
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
router.get('/imagesQrCodeCheckin/event/:eventId', QrCodeController.getEventIdByQrCode);
