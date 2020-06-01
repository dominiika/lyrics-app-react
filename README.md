# lyrics-app-react

**To see the full live application, visit:<br/>
https://lyrics-app-bf3d0.web.app/**

The full application consists of two apps - a frontend one and a backend one. This is the frontend part.<br/>
You can see the live API application here:<br/>
https://lyrics-app-api.herokuapp.com/api/

Here you can see the code of the backend (Django) part:<br/>
https://github.com/dominiika/lyrics-app-djangorestframework

**React version 16.13.1**


### Functionality overview

This is a website which enables the user to add lyrics, songs, artists, genres, listen to music and watch videos.
It uses both a custom API and an external API for requests. 

##### General functionality

- fetching data (songs, album images, etc.) from Spotify API
- fetching videos from YouTube API
- fetching lyrics from Genius API
- signing up and logging in
- adding, viewing and editing artists, genres, songs 
- leaving rates 
- searching for records<br/> 


### Installing and Prerequisites

If you'd like to clone this app and use it locally, then you need to do the following steps:<br/>

1. Clone and run the API repository.<br/>
https://github.com/dominiika/lyrics-app-djangorestframework

2. Clone this repository.

3. Go to .env file and change 

```
REACT_APP_API_URL=https://lyrics-app-api.herokuapp.com
```
to 

```
REACT_APP_API_URL=http://127.0.0.1:8000
```
so that the app uses your local API instead of the live one.


4. Create virtual environment and run it:

```
virtualenv venv

source venv/bin/activate
```

5. Go into the app directory and install dependencies:

```
npm install
```

6. Run the server:

```
npm start 
```

7. 7. You can visit the app at http://127.0.0.1:3000 or http://localhost:3000

