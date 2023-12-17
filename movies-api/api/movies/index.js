import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies
  } from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';
import User from '../users/userModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticateMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ success: false, msg: 'Unauthorized. No token provided.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded); // Log the decoded token payload
      req.user = decoded; // Set user details in the request
      next();
    } catch (error) {
      console.error(error); // Log the error
      return res.status(401).json({ success: false, msg: 'Unauthorized. Invalid token.' });
    }
  };

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const movieGenres = await getMovieGenres();
    res.status(200).json(movieGenres);
}));

router.post('/:id/favorite', authenticateMiddleware, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const movieId = req.params.id;

    console.log('User ID:', userId);
    console.log('Movie ID:', movieId);

    // Check if the movie is already in favorites
    const user = await User.findById(userId);
    if (user.favorites.includes(movieId)) {
        return res.status(400).json({ success: false, msg: 'Movie already in favorites.' });
    }

    // Add movie to favorites
    user.favorites.push(movieId);
    await user.save();

    res.status(200).json({ success: true, msg: 'Movie added to favorites successfully.' });
}));

router.get('/favorites', authenticateMiddleware, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    
    const user = await User.findById(userId).populate({
        path: 'favorites'
    });
    
    res.status(200).json({ favorites: user.favorites });
}));

export default router;