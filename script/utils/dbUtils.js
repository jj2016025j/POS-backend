const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const dbUtils = {
  ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
  },

  uploadImage(file, targetDir) {
    const imageName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${mime.extension(file.mimetype)}`;
    const targetPath = path.join(targetDir, imageName);
    dbUtils.ensureDirectoryExistence(targetPath);
    fs.renameSync(file.path, targetPath);
    return imageName;
  },
};

module.exports = dbUtils;


genearteTradeNo: () => {
  return 'ORD' + Date.now() + Math.random().toString(36).substring(4);
},

 async (formData, imageFile) => {
  return new Promise((resolve, reject) => {
    const image_name = pool.uploadImage(imageFile, './public/uploads/foods');
    const image_path = '/uploads/foods/' + image_name;

    pool.query('INSERT INTO foods (name, price, category_id, image_url) VALUES(?,?,?,?)', [
      formData['item-name'],
      formData['item-price'],
      formData['select-type'],
      image_path
    ], (error, results) => {

      if (error) {
        reject(error);
        return;
      }
      resolve(results)
    });
  })
}
