const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const unique = Date.now()
        cb(null, `${unique}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload