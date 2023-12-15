import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PaginationComponent from "../components/pagination";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("popularity.desc"); // state for current page and filter
  const {  data, error, isLoading, isError }  = useQuery(['discover', { page: currentPage }], () => getMovies(currentPage)); // gets movies using useQuery hook

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (type, value) => {
    if (type === "filter") {
      setSelectedFilter(value);
      setCurrentPage(1);
    }
  };
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const totalPages = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true
  
 

  return (
    <>
      <PageTemplate
      title='Discover Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie}
        />;
      }}
      selectedFilter={selectedFilter}
      onFilterChange={handleFilterChange}
      />
        <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={(page) => setCurrentPage(page)}
      />
    </>
  
  );
};
export default HomePage;