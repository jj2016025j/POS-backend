// utils/fileUtils.js
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const fileUtils = {
  ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
  },

  uploadImage(file, targetDir) {
    const imageName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${mime.extension(file.mimetype)}`;
    const targetPath = path.join(targetDir, imageName);
    this.ensureDirectoryExistence(targetPath);
    fs.renameSync(file.path, targetPath);
    return imageName;
  },
};

module.exports = fileUtils;
