import express from 'express';
import multer from 'multer';
import { cloudinaryStorage } from '../utils/cloudinary';
import { deleteImage, getImages, uploadImages } from '../controllers';

const router = express.Router();

const upload = multer({ storage: cloudinaryStorage });

router.get('/hello', (_req, res) => res.json({ message: 'hello' }));
router.get('/images', getImages);
router.post('/upload', upload.array('images'), uploadImages);
router.delete('/image', deleteImage); // TODO: Validate route by google token

export default router;
