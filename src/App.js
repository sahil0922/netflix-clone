import './App.css';
import Row from './Components/Row';
import requests from './request';
import Banner from './Components/Banner';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">

      <Nav />
      <Banner />
      <Row title="Netflix Originals" isLargeRow = {true} fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentary Movies" fetchUrl={requests.fetchDoumentaries} />
      </div>
  );
}

export default App;
