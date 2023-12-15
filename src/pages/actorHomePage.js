import React, { useState } from "react";
import { getActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PaginationComponent from "../components/pagination";

const ActorHomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
const { data, error, isLoading, isError } = useQuery(['popular', { page : currentPage }], () => getActors(currentPage));

  
  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;
  const totalPages = data.total_pages;

  return (
    <>
      <PageTemplate
      title='Discover Actors'
      actors={actors}
      />
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={(page) => setCurrentPage(page)}
      />
    </>
  );
};
export default ActorHomePage;