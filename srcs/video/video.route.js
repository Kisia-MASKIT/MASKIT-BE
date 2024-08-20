// srcs/video/video.route.js
import express from 'express';
import { VideoController } from './video.controller.js';
import authenticateToken from '../../config/jwt.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/upload', VideoController.upload);

router.get('/download/masked', VideoController.downloadMaskVideo);
router.get('/download/subject', VideoController.downloadSubjectVideo);
router.get('/detection', VideoController.getDetectionResults);
router.get('/info', VideoController.getVideoInfo); // New route for video info

export default router;
