const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
// Helmet aide à protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
const helmet = require("helmet")
const {sequelize} = require('./models')
const config = require('./config/config')
const multer = require('multer')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
// Définition du chemin pour enregistrement des photos sur le backend
app.use('/images', express.static(path.join(__dirname, 'images')))
// const upload = multer({
//   dest: "./uploads"
// })
// app.use("/upload", upload.single("file"), (req, res) => {
//   res.json({ file: req.file })
// })

// librairie passport
require('./passport')

require('./routes')(app)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
