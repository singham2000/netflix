import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
  movie: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  console.log(genres);
  return genres;
});

const createArrayFromData = (array, movieArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((id) => {
      const name = genres.find(({ id }) => id === genres.id);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      movieArray.push({
        id: movie.id,
        name: movie?.orignal_name ? movie.original_name : movie.orignal_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const movieArray = [];
  for (let loop = 1; movieArray < 60 && loop < 10; loop++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${loop}` : ""}`);
    createArrayFromData(results, movieArray, genres);

    return movieArray;
  }
};
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();

    const data = getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    console.log(data);
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
