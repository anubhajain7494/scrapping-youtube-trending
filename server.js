const express = require('express')
const mongoose = require('mongoose')
const Video = require('./models/video')
const videoRouter = require('./routes/scrapping')
const methodOverride = require('method-override')
const port = process.env.port || 3000
const app = express()

process.setMaxListeners(0);

mongoose.connect('mongodb://localhost/scrapping', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
	const videos = await Video.find().sort({'created_date': 'ASC'})
	res.render('videos/index', {videos: videos})
})

app.use('/videos', videoRouter)

app.listen(port)
console.log('Server started on Port ' + port)