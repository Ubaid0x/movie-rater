const token = "f8756581ceddad34e71c34bd4b7885f4024c2236"

export class API {
    static updateMovie(mov_id, body){
        console.log({mov_id})
        return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )         
        }).then(res => res.json())
    }
}