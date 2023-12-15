import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "../pagination";

function MovieListPageTemplate({ movies, title, action, currentPage, totalPages, handlePagination}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [selectedFilter, setSelectedFilter] = useState("popularity.desc");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

    if (selectedFilter === "popularity.desc") { // sorting the movies based on the selected filters
      displayedMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedFilter === "vote_average.desc") {
      displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (selectedFilter === "vote_average.asc") {
      displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
    }

  const handleFilterChange = (type, value) => { // handles the change in the filters
    if (type === "filter") {
      setSelectedFilter(value);
    } else if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    }
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={(type, value ) => handleFilterChange(type, value)}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            onFilterChange={(type, value) => handleFilterChange(type, value)}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePagination={handlePagination} />
    </Grid>
  );
}
export default MovieListPageTemplate;