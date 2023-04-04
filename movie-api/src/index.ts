import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import NodeCache from "node-cache";
import axios from "axios";

dotenv.config();

const app: Express = express();
const cache = new NodeCache();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!");
});

app.post("/movies", async (req: Request, res: Response) => {
  const oldRequest = cache.get(req.body.search);
  if (oldRequest) {
    res.send({ movies: oldRequest, cache: true });
  } else {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${req.body.search}&page=1&include_adult=false`
    );
    if (movies.status !== 200) {
      res.status(500).send("Error");
    }
    cache.set(req.body.search, movies.data, 120);
    res.send({ movies: movies.data, cache: false });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
