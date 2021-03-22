import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetail from './components/movie-detail';
import MovieForm from './components/movie-form';

function App() {
  const [movies, setMovie] = useState(["Movie 1"]);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [editMovie, setEditMovie] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token f8756581ceddad34e71c34bd4b7885f4024c2236'
      }
    })
    .then(res => res.json())
    .then(res => setMovie(res))
    .catch(err => console.log(err))
  }, [])

  const loadMovie = (movie) => {
    setEditMovie(null)
    setSelectedMovie(movie)
  }

  const editMovieClicked = (movie) => {
    setEditMovie(movie)
    setSelectedMovie(null)
  }

  const updateMovie = (movie) => {
    const newMovies = movies?.map((mov) =>{
      if(mov.id === movie.id){
        return movie
      }
      return mov
    })
    setMovie(newMovies)
  }

  const newMovie = () => {
    setEditMovie({ title: '', description: '' });
    setSelectedMovie(null);
  }

  const movieCreated = (movie) => {
    const newMovies = [...movies, movie];
    setMovie(newMovies);
  }

  const movieDeleted = (movie) => {
    const newMovies = movies?.filter(mov => mov.id !== movie.id)
    setMovie(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Movie Rater </h1>
        <div className="Layout">
          <div>
            <MovieList 
              movieClicked={(movie) => loadMovie(movie)}
              editClickMovie={(movie) => editMovieClicked(movie)}
              movieDeleted={(movie) => movieDeleted(movie)}
              movies={movies} />
            <button onClick={newMovie}>New Movie</button>
          </div>
            <MovieDetail 
              movieClicked={(movie) => loadMovie(movie)}
              movie={selectedMovie} 
              updateMovie={loadMovie}
              />  
            {editMovie && <MovieForm movie={editMovie} 
            createMovie={movieCreated}
            updateMovie={updateMovie} />}
        </div>
      </header>
    </div>
  );
}

export default App;
