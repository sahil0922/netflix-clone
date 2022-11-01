import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// const API_KEY = "3034ee1bb5d35176987cb6bddd916744";

const base_poster_URL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, isLargeRow, fetchUrl}) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => console.log(error));
    }
  }


  return (
    <div className="row">
      <h2 className={`title_text ${isLargeRow && "title_textLarge"}`}> {title} </h2>

      <div className="row_posters">
        {/* several movie posters */}
        {movies.map(
          (movie) =>
            movie.backdrop_path !== null && (
              <img
                onClick = {() => handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_poster_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                key={movie.id} 
              />
            )
        )}
      </div>

      <div style={{ padding: "10px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

    </div>
  );
};

export default Row;

