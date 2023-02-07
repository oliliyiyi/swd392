import express from 'express';
import * as CampusController from '../controller/campus/CampusController';

const router = express.Router();

router.get('/api/campus', CampusController.getAllListCampus);

export { router };