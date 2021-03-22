import React, { useState } from 'react';
import { API } from '../api-service';

const MovieForm = (props) => {
    const [title, setTitle] = useState(props.movie.title);
    const [description, setDescription] = useState(props.movie.description);

    const updateClicked = () => {
        console.log('update is clicked')
        API.updateMovie(props.movie.id, { title, description })
            .then(res => props.updateMovie(res))
            .catch(err => console.log({err}))
    }

    const createMovie = () => {
        API.createMovie({ title, description })
            .then(res => console.log({res}))
            .catch(err => console.log({err}))
    }

    return (
        <React.Fragment>
        {props.movie ?
            <div>
                <label htmlFor={'title'}> Title </label> <br />
                <input id={'title'} type="text" placeholder={"title"} value={title} 
                onChange={(e) => setTitle(e.target.value)} /> <br />
                <label htmlFor={'description'}> Description </label> <br />
                <textarea id={'description'} type={"text"} placeholder={"description"}
                    value={description} onChange={(e) => setDescription(e.target.value)}/> <br />
                {props.movie.id ?
                <button onClick={updateClicked}> Update </button>:
                <button onClick={createMovie}> Create </button>}
            </div>
            : null}
        </React.Fragment>
    )
}
export default MovieForm