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
const FirebaseController = __importStar(require("../controller/firebaseController"));
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
 *         security:
 *          - bearerAuth: []
 *         summary: This api is used to check if get method is available or not.
 *         description: This api is used to check if get method is available or not.
 *         responses:
 *             200:
 *                description: To test get method is available.
 */
router.get("/api/campus", Auth_1.isAuth, CampusController.getAllListCampus);
router.get("/api/student/info", StudentController.getStudentInfoByEmail);
/**
 * @swagger
 * /api/event/insert:
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
router.post("/api/event/insert", Auth_1.isAuth, EventController.admInsertEvent);
/**
 * @swagger
 * /api/event:
 *    get:
 *       summary: Get events
 *       description: Get events in a specified campus
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 campus_id:
 *                      type: number
 *               required:
 *               - campus_id
 *         responses:
 *            '200':
 *               description: OK
 *            '400':
 *               description: Bad Request
 */
router.get("/api/event", EventController.getAllEventsInCampus);
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
router.post('/images', upload.single('file'), FirebaseController.handlePostFile);
