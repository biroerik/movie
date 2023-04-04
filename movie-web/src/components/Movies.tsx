import { ThemeProvider } from "@emotion/react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Stack,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  createTheme,
  TextField,
  CircularProgress,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { fetchMovies } from "../requests/requests";
import { useQuery } from "react-query";

const theme = createTheme();
const Movies = () => {
  const [search, setSearch] = useState<string>("");
  const [isCache, setCache] = useState<boolean | undefined>(undefined);
  const { isLoading, data, refetch } = useQuery(
    "movies",
    async () => fetchMovies(search),
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (data) {
      if (data.cache) {
        setCache(true);
      } else {
        setCache(false);
      }
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                label="Search"
                variant="standard"
              />
              <Button onClick={() => refetch()} variant="outlined">
                Search
              </Button>
            </Stack>
          </Container>
        </Box>
        {isCache !== undefined && (
          <Button disabled>{isCache === false ? "API" : "CACHE"}</Button>
        )}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              !!data &&
              data.movies.results.map((movie: any) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                      </Typography>
                      <Typography>{movie.overview}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Movies;
