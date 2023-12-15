import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ currentPage, totalPages, handlePagination }) => {
  const handleChange = (event, value) => { // event handler for changing pages
    handlePagination(value);
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: '20px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '25px',
        backgroundColor: '#FFD3E0',
        padding: '10px',
        boxShadow: '0px -1px 5px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationComponent;
