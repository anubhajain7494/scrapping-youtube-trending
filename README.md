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

Follow the below steps to deploy the above NodeJS application on your server:
1. Install NodeJS and NPM
2. Install Git and clone repository from GitHub
3. Install dependencies
4. Run the application
5. Access the application in browser

**Install NodeJS and NPM**

If not already installed, follow the below links:
https://nodejs.org/en/download/
https://www.npmjs.com/get-npm

Once installed, test that node and npm are installed and running correctly by typing the following at the terminal:
node -v
npm -v

**Install Git and clone repository from GitHub**

To install git, run below commands in the terminal window:
sudo yum update -y
sudo yum install git -y

Just to verify if system has git installed or not, please run below command in terminal:
git — version
This command will print the git version in the terminal.

Run below command to clone the code repository from Github:
git clone https://github.com/anubhajain7494/scrapping-youtube-trending.git
This will create a folder with name 'scrapping-youtube-trending'.

**Install dependencies**

Now, move to the folder 'scrapping-youtube-trending' by running below command in the terminal window:
cd node-app

If you check the list of folders using ls command, the current folder structure does not contain the node_modules folder. This folder will be created automatically after installing the dependencies.

To install dependencies, run below command in the terminal:
npm install

**Start the application**

To start the application, run the below command in the terminal:

node index.js

If the server runs successfully, then it should print a message with the port number in the terminal window.


**Access the application in browser**

Now, we are ready and can access our application using our Public IP and port 3000 in browsers.






