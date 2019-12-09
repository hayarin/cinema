const https = require('https')
const http = require('http')
const app = require('express')()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const cors = require('cors')

const files = fs.readdirSync('###FILE STORAGE###', { withFileTypes: true })

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '###FILE STORAGE###')
  },
  filename: function(req, file, cb) {
    cb(
      null,
      randStr(4, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') +
        path.extname(file.originalname)
    )
  }
})


function randStr(length, chars) {
  let result = ''
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

const randVid = function() {
  let dirFilter = files
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)

  let oFilename = dirFilter[Math.floor(Math.random() * dirFilter.length)]
  const randomVideoLink = '###LINK###' + oFilename
  return randomVideoLink
}

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|webm|MP4)$/)) {
      return null
    }
    cb(null, true)
  }
})

app.get('/capi/r', (req, res) => {
  let responseLink = randVid()
  res.send(responseLink)
})

app.post('/capi/u', upload.single('file'), async (req, res) => {
  res.send('###LINK###' + req.file.filename)
})

app.use(cors())

http.createServer(app).listen(8005, () => console.log('http on 8005 ready'))