import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

let MovieDetail = (props) => {
    const [highlighted, setHighlighted] = useState(-1);

    let movie = props.movie;

    const highlightedRate = high => {
        setHighlighted(high)
    }

    let rateClicked = (rating) => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Token f8756581ceddad34e71c34bd4b7885f4024c2236"
            },
            body: JSON.stringify({ stars: rating + 1 })
        })
        .then(response => response.json())
        .then(res => { getDetails(rating) })
        .catch(err => console.log({err}))
    }

    const getDetails = (rating) => {
        fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Token f8756581ceddad34e71c34bd4b7885f4024c2236"
            }
        })
        .then(response => response.json())
        .then(res => { props.updateMovie(res) })
        .catch(err => console.log({err}))
    }

    console.log('avg rating ', movie)

    return (
        <React.Fragment>
            {props.movie ?
                <div>
                    <h2> {movie.title} </h2>
                    <h2> {movie.description} </h2>
                    <FontAwesomeIcon icon={faStar} className={movie.average_rating > 0 ? 'orange' : ''} />
                    <FontAwesomeIcon icon={faStar} className={movie.average_rating > 1 ? 'orange' : ''} />
                    <FontAwesomeIcon icon={faStar} className={movie.average_rating > 2 ? 'orange' : ''} />
                    <FontAwesomeIcon icon={faStar} className={movie.average_rating > 3 ? 'orange' : ''} />
                    <FontAwesomeIcon icon={faStar} className={movie.average_rating > 4 ? 'orange' : ''} />
                    ({movie.no_of_ratings})
                    <div className="rate-container">
                        <h2> Rate it </h2>
                        {[...Array(5)].map((e,i) => {
                            return <FontAwesomeIcon key={i} className={highlighted > i-1 ? 'purple' : ''}
                                onMouseEnter={() => highlightedRate(i)}  
                                onMouseLeave={() => highlightedRate(-1)}
                                onClick={() => rateClicked(i)}
                                icon={faStar} />
                        })}
                </div>
            </div>
            :
            null}
        </React.Fragment>    
    )
}
export default MovieDetail