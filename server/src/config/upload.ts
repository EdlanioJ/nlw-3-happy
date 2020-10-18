import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      let name = crypto.randomBytes(24).toString('hex');
      const mimetype = file.mimetype.split('/');
      const ext = mimetype[mimetype.length - 1];

      const filename = `${name}.${ext}`;

      cb(null, filename);
    },
  }),
};
