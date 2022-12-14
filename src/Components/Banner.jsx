import React, { useEffect, useState } from 'react'
import axios from '../axios';
import requests from '../request';
import "./Banner.css"

const Banner = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovies(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);
             return request;
        }
        fetchData();
    }, []);

    function truncateString(str, n) {
        return (str?.length > n ? str.substr(0, n - 1) + "..." : str);
      }
 
  return (
    <header className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
    >

        <div className="banner_contents">
            {/* {title} */}
            <h1 className='banner_title'>
                {movies?.title || movies?.name || movies?.original_name}
            </h1>
            {/* {div with 2 button} */}
            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>
            {/* {discription} */}
            <h1 className="banner_description">
                {truncateString(movies?.overview, 250)}</h1>
        </div>

        <div className='banner_fadeBottom'/>
    </header>
  )
}

export default Banner