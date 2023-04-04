import axios from "axios";

const backendURL = "http://localhost:8080";

export async function fetchMovies(search: string) {
  const response = await axios.post(`${backendURL}/movies`, { search });
  return response.data;
}
