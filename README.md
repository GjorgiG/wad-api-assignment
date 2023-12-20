# Assignment 2 - Web API.

Name: Gjorgi Gjorgiev

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Feature 1 
 + Feature 2 
 + Feature 3 
 + etc

## Setup requirements.

The same as normally running an app. "npm run" for the React App & "npm run dev" for the database server.

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

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

Didn't get the API design working for movies or reviews and made an attempt at linking favourites to users but was unable and reverted back to previous version.

## Security and Authentication

Users will have to login with password and password is required to be 8 characters long, has to contain numbers and special characters. Favourites + Watchlist are protected routes.

## Integrating with React App

Integrated the API into my React app by using the users collection to be used for the login page.
