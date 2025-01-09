import * as express from 'express';
import cloudinary from './cloudinary';

const router = express.Router();

router.use('/cloudinary', cloudinary);

export default router;
