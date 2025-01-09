import express from 'express';
import multer from 'multer';
import { cloudinaryStorage } from '../utils/cloudinary';
import { deleteImage, getImages, uploadImages } from '../controllers';

const router = express.Router();

const upload = multer({ storage: cloudinaryStorage });

router.post('/upload', upload.array('images'), uploadImages);
router.get('/images', getImages);
router.delete('/image', deleteImage); // TODO: Validate route by google token

export default router;