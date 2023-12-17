import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries, useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import useAuthToken from "../hooks/useAuthToken";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);
  const { getAuthToken } = useAuthToken(); // Use the custom hook
  const userId = "yourUserId"; // Replace with the actual user ID, you can get it from your authentication system


  const { data: favoriteMovies, isLoading: isLoadingFavorites, refetch } = useQuery(['favorites', userId], async () => {
    const authToken = getAuthToken();
    
    // Use the auth token in the fetch request
    const response = await fetch('/api/movies/favorites', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorite movies');
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse response as JSON');
    }
  });

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading || isLoadingFavorites) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data;
  });

  // const toDo = () => true;

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => {
        return(
          <>
            <RemoveFromFavorites movie = {movie}/>
            <WriteReview movie = {movie} />
          </>
        );
      }}
    >
      {/* Display favoriteMovies somewhere in your component */}
      {favoriteMovies && (
        <div>
          <h2>Your Favorite Movies:</h2>
          {/* You can map through favoriteMovies and display information */}
          {favoriteMovies.map((movie) => (
            <p key={movie.id}>{movie.title}</p>
          ))}
        </div>
      )}
    </PageTemplate>
  );
};

export default FavoriteMoviesPage;