import multer from 'multer'

export const config = {
  serverPort: 4000,
  dbURL:
    'mongodb+srv://Rostislav:733@dbfortest.sucxa.mongodb.net/DbForTest?retryWrites=true&w=majority',
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/${req.params.path}`)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Math.floor(Math.random() * 999) +
        Date.now() +
        file.mimetype.replace('/', '.')
    )
  },
})
export const upload = multer({ storage: storage })
