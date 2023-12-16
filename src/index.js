import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMovies from './pages/upcomingMovies';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider from "./contexts/authContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import Watchlist from './pages/watchlistMovies';
import Actors from './pages/actorHomePage';
import ActorDetails from './pages/actorDetailsPage';
import LatestMovie from './pages/latestMovies';
import TrendingMovies from "./pages/trendingMovies";
import Login from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
          <Route path="/movies/upcoming" element={<UpcomingMovies />} />
          <Route path="/movies/trending" element={<TrendingMovies />} />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/watchlist" element={ <Watchlist /> } />
          </Route>
          <Route path="/actors" element={ <Actors /> } />
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/movies/latest" element={<LatestMovie />} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <SignUpPage /> } />
        </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);