import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

let MovieList = (props) => {
    return (
        <div>
            {props.movies && props.movies.map((movie, index) => {
                return <div key={index} className={"movie-item"}>
                    <h2 onClick={() => props.movieClicked(movie)}> {movie.title} </h2>
                    <FontAwesomeIcon icon={faEdit} onClick={() => props.editClickMovie(movie)}/>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            })}
        </div>    
    )
}
export default MovieList