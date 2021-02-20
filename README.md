# scrapping-youtube-trending
A Node application to scrap the popular/trending videos from Youtube, save them into the database, and list down the videos on a webpage from the database.

**About the project**
We have the following API endpoints:
1. One API endpoint to retrieve the popular videos from YouTube: "https://www.youtube.com/feed/trending" and save them into the database.
    **{myIP}:3000/videos/saveTrendingvideos**
    
2. Second API endpoint to return the list of all the videos from the database.
    **{myIP}:3000**

3. Third API endpoint that returns the detail about each video. The video detail API response should include "video title", "description", "video URL", "video thumbnail", "video view count", "likes" and "dislike" count, channel title, channel description, channel thumbnail and channel subscribers.
    **{myIP}:3000/videos/edit/{videoID}**

Here, {myIP} is the location IP of the server where the application is deployed and {videoID} is the unique video id from the Mongo DB.

**Setup steps**

**Installation**
