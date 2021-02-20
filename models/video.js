const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  video_title: {
    type: String,
    required: 'Kindly enter the title of the video'
  },
  video_url: {
    type: String,
    required: 'Kindly enter the URL of the video'
  },
  video_description: {
    type: String
  },
  video_description_full: {
    type: String
  },
  video_embed_url: {
    type: String
  },
  video_thumbnail_image: {
    type: String
  },
  views_count: {
    type: String
  },
  likes_count: {
    type: String
  },
  dislikes_count: {
    type: String
  },
  channel_title: {
    type: String
  },
  channel_description: {
    type: String
  },
  channel_thumbnail: {
    type: String
  },
  channel_subscribers: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Video', videoSchema)