import React from "react";
import UserData from "./UserData";
import Grid from "@mui/material/Grid2";
import { Typography, CircularProgress, Box, Button } from "@mui/material";
import { useSearch } from "../context/SearchContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Results = () => {
  const usersPerPage = 30;
  const {
    totalCount,
    isLoading,
    users,
    page,
    setPage,
    searchQuery,
    errorMessage,
  } = useSearch();

  const totalPages = Math.ceil(totalCount / usersPerPage);


  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 150px)",
        overflow: "auto",
        marginTop: "20px",
      }}
    >
      {errorMessage ? (
        <Typography variant="h6" color="error" align="center" gutterBottom>
          {errorMessage}
        </Typography>
      ) : users.length === 0 ? (
        <Typography variant="h6" align="center" gutterBottom>
          No Results
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={12}>
            <Box
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#fff",
                zIndex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
              }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                "{searchQuery}" Search Results
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  <ArrowBackIosNewIcon />
                </Button>
                <Typography align="right">
                  {page} / {totalPages}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleNextPage}
                  disabled={page * 30 >= totalCount}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Box>
            </Box>
          </Grid>
          {isLoading ? (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%", height: "100vh" }}
            >
              <CircularProgress />
            </Grid>
          ) : (
            users.map((user) => (
              <Grid key={user.username}>
                <UserData user={user} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Results;
