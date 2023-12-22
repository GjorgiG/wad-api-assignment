# Assignment 2 - Web API.

Name: Gjorgi Gjorgiev

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Sign Up functionality
 + Login functionality

## Setup requirements.

The same as normally running an app. "npm run" for the React App & "npm run dev" for the database server.

## API Configuration

I created an .env file in the labs and used that one for my assignment as well.
______________________
NODEENV=development
PORT=8080
HOST=localohost
mongoDB=MyMongoURL
TMDB_KEY=MyTMDBKey
seedDb=true
secret=MyJWTSecret
______________________

## API Design

+ /api/users | POST | Logs in a new user if authentication is successful.
+ /api/users?action=register | POST | Registers a new user to the app.

## Security and Authentication

Users will have to login with password and password is required to be 8 characters long, has to contain numbers and special characters. Favourites + Watchlist are protected routes.

## Integrating with React App

Integrated the API into my React app by using the users collection to be used for the login page.
