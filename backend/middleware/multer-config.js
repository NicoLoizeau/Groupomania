const multer = require('multer');

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const nameNoExtension = name.split('.', 1);
        const extension = MINE_TYPES[file.mimetype];
        callback(null, nameNoExtension + '_' + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).any('photo');