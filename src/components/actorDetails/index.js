import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import StarRate from "@mui/icons-material/StarRate";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import FilmographyList from "../filmographyCard";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const getGenderString = (gender) => {
  switch (gender) {
    case 0:
      return "Not set/specified";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
  }
};

const ActorDetails = ({ actor }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // manages whether the drawer is open or closed
  const { data, error, isLoading, isError } = useQuery( // fetches actor credits using useQuery
    ["actorCredits", { id: actor.id }],
    getActorCredits
  );


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const filmography = data.cast || []; // extracts filmography data

  return ( // renders the whole actor details component
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      
      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Paper component="ul" sx={{...root}}>
      <li>
          <Chip label="Date of Birth" sx={{...chip}} color="primary" />
        </li>
        <li>
            <Chip label={actor.birthday} sx={{...chip}} />
          </li>
          </Paper>


          <Paper component="ul" sx={{...root}}>
          <Chip label="Popularity" sx={{...chip}} color="primary" />
          <li>
          <Chip
          icon={<StarRate />}
          label={`${actor.popularity}`} />
          </li>
      </Paper>


      <Paper component="ul" sx={{...root}}>
          <Chip label="Gender" sx={{...chip}} color="primary" />
          <li>
          <Chip
          icon={<PersonIcon />}
          label={getGenderString(actor.gender)} />
          </li>
      </Paper>

      <Typography variant="h5" component="h3">
        Filmography
      </Typography>
      <Grid container spacing={2}>
        {filmography.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FilmographyList movie={movie} />
          </Grid>
        ))}
      </Grid>


      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        
      </Drawer>
      </>
  )
}
export default ActorDetails;
