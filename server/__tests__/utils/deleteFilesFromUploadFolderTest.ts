import path from 'path';
import fs from 'fs';

export default () => {
  const imgPath = path.join(__dirname, '..', 'uploads');

  fs.readdir(imgPath, (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(imgPath, file);
      fs.unlink(filePath, () => {
        return;
      });
    });
  });
};
