const express = require('express')
const Video = require('./../models/video')
const router = express.Router()
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var main_page_url = 'https://www.youtube.com/feed/trending';

router.get('/edit/:id', async (req, res) => {
  const video = await Video.findById(req.params.id);

  fetchFromYouTube(video.video_url, (data) => {
    fetchAndSaveTrendingVideoContent(data, video.id, res);
  });
})

router.put('/update/:id', async (req, res, next) => {
  req.video = await Video.findById(req.params.id)
  next()
}, saveVideoAndRedirect('/'))

router.get('/saveTrendingVideos', async (req, res) => {
  fetchFromYouTube(main_page_url, (data) => {
    getTrendingVideoPageContent(data, res);
  });
})

function getYoutubeID(url) {
  var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  id = id[1];
  return id;
};

async function fetchFromYouTube(page_url, resp) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage()
 
  try {
    console.log('Fetching Data from URL: ' + page_url);
    await page.goto(page_url, { waitUntil: ['load'], timeout: 100000 });
    if (page_url != main_page_url) {
      await page.waitForSelector('#avatar');
    }
    resp(await page.content())
    await page.close();
    await browser.close();
  } catch (error) {
    if (error.message.includes('ERR_CONNECTION_CLOSED')) {
      console.log(error.message);
      await page.close();
      await browser.close();
    } else {
      console.log(error.message);
    }
  }
}

function trimText(str) {
    if (str != '') {
      return str.trim();
    }
    return '';
} 

function getTrendingVideoPageContent(data, res) {
  const $ = cheerio.load(data)
  var id = video_url = video_title = likes = dislikes = '';
    
  $('div#dismissable.ytd-video-renderer').each(function (i, link) {
      video_title = trimText($(link).find('a#video-title').text());
  
      if (video_title != '') {
        $('#top-level-buttons').find('ytd-toggle-button-renderer.ytd-menu-renderer').each(function (i, el) {
          if (i == 0) {
            likes = $(el).find('yt-formatted-string#text.ytd-toggle-button-renderer').text();
          } else {
            dislikes = $(el).find('yt-formatted-string#text.ytd-toggle-button-renderer').text();
          }
        });
        
        video_url = 'https://www.youtube.com' + $(link).find('a#video-title').attr('href');
        id = getYoutubeID(video_url);

        var video = new Video();
        video.video_title = video_title;
        video.video_url = video_url;
        video.video_description = trimText($(link).find('#description-text').text());
        video.video_description_full = '';
        video.video_thumbnail_image = "https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";
        video.video_embed_url = "https://www.youtube.com/embed/"+ id;
        video.views_count = ($(link).find('#metadata-line span:nth-child(1)').text()).replace(' views', '');
        video.likes_count = likes;
        video.dislikes_count = dislikes;
        video.channel_title = trimText($(link).find('a.yt-simple-endpoint.yt-formatted-string').eq(0).text());
        video.channel_description = 'Here is the channel Link: ' + 'https://www.youtube.com' + $(link).find('a.yt-simple-endpoint').attr('href');
        video.channel_thumbnail = '';
        video.channel_subscribers = $('ytd-video-secondary-info-renderer.ytd-watch-flexy').find('yt-formatted-string.ytd-video-owner-renderer').text();
        
        video.save();
      } else {
        console.log('Title empty');
      }
  });
  res.send({'status': 200, 'message': 'Trending Youtube Videos successfully saved in DB'})
}

function saveVideoAndRedirect(path) {
  return async (req, res) => {
    let video = req.video
    video.video_title = req.body.video_title
    video.video_description = (req.body.video_description_full).substr(0, 190) + '...'
    video.video_description_full = req.body.video_description_full
    video.video_url = req.body.video_url
    video.views_count = req.body.views_count
    video.likes_count = req.body.likes_count
    video.dislikes_count = req.body.dislikes_count
    video.channel_title = req.body.channel_title
    video.channel_description = req.body.channel_description
    video.channel_subscribers = req.body.channel_subscribers

    try {
      video = await video.save()
      res.redirect(path)
    } catch (e) {
      res.render(`videos/${path}`, { video: video })
    }
  }
}

async function fetchAndSaveTrendingVideoContent(data, id, res) {
    const video_content = await Video.findById(id);
    $ = cheerio.load(data)
    var likes = dislikes = '';
    
    $('#top-level-buttons').find('ytd-toggle-button-renderer.ytd-menu-renderer').each(function (i, el) {
      if (i == 0) {
        likes = $(el).find('yt-formatted-string#text.ytd-toggle-button-renderer').text();
      } else {
        dislikes = $(el).find('yt-formatted-string#text.ytd-toggle-button-renderer').text();
      }
    });
    video_content.video_description_full = (video_content.video_description_full == '') ? trimText($('ytd-video-secondary-info-renderer.ytd-watch-flexy').find('yt-formatted-string.ytd-video-secondary-info-renderer').text()) : '';
    video_content.likes_count = (video_content.likes_count == '') ? likes : '';
    video_content.dislikes_count = (video_content.dislikes_count == '') ? dislikes : '';
    video_content.channel_thumbnail = $('#avatar').find('img').attr('src');
    video_content.channel_subscribers = (video_content.channel_subscribers == '') ? ($('ytd-video-secondary-info-renderer.ytd-watch-flexy').find('yt-formatted-string.ytd-video-owner-renderer').text()).replace(' subscribers', '') : '';
    
    video_content.save();
    res.render('videos/edit', { video: video_content })
}


module.exports = router
