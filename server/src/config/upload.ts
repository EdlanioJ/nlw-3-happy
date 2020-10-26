import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storageDestination = {
  test: path.join(__dirname, '..', '..', '__tests__', 'uploads'),
  production: path.join(__dirname, '..', '..', 'uploads'),
};

export default {
  storage: multer.diskStorage({
    destination:
      storageDestination[
        process.env.NODE_ENV === 'test' ? 'test' : 'production'
      ],
    filename: (request, file, cb) => {
      let name = crypto.randomBytes(24).toString('hex');
      const mimetype = file.mimetype.split('/');
      const ext = mimetype[mimetype.length - 1];

      const filename = `${name}.${ext}`;

      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 5,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/pjpeg',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('ficheiro não valido'));
    }
  },
} as multer.Options;
