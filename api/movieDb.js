import axios from "axios";
import { apiKey, apiReadAccessToken } from "../constants";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie`;

//endpoints with dynamic params

//movie details
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits`;
const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}`;
const relatedMoviesEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar`;

//cast
const castDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}`;
const castMoviesEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits`;

// functions to get images of different widths, so that to improve the loading times)
export const image500 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackCastImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endPoint, params) => {
  const options = {
    method: "GET",
    url: endPoint,
    params: params ? params : {},
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiReadAccessToken}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    console.log(error.message);
    return {};
  }
};

//for home screen

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

//for movie screen

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchRelatedMovies = (id) => {
  return apiCall(relatedMoviesEndpoint(id));
};
