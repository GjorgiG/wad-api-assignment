import React, { useState } from "react";
import ActorHeader from "../headerActorList";
import FilterCard from "../filterActorsCard";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";
import Pagination from "../pagination";

function ActorListPageTemplate({ actors, name, currentPage, totalPages, handlePagination }) {
  const [nameFilter, setNameFilter] = useState("");

  let displayedActors = actors
    .filter((a) => {
      return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    });

  const handleChange = (type, value) => { // event handler for change in filter
    if (type === "name") setNameFilter(value);
    else setNameFilter(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <ActorHeader name={name} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            nameFilter={nameFilter}
          />
        </Grid>
        <ActorList actors={displayedActors}></ActorList>
      </Grid>
      <Pagination currentPage={currentPage} totalPages={totalPages} handlePagination={handlePagination} />
    </Grid>
  );
}
export default ActorListPageTemplate;