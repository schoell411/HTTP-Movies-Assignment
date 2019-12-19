import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
	title: "",
	director: "",
	metascore: "",
	stars: []
};

const UpdateMovie = props => {
	const [movie, setMovie] = useState(initialMovie);

	useEffect(() => {
		const editMovie = props.movies.find(
			item => `${item.id}` === props.match.params.id
		);
		if (editMovie) {
			setMovie(editMovie);
		}
    }, [props.movies, props.match.params.id])
    
    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                const updatedList = props.movies.map(item => {
                    if(item.id === movie.id) {
                        return item = res.data
                    } else {
                        return item
                    }
                })
                props.setMovies(updatedList)
            })
            .catch(err => console.log(err))
        props.history.push('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChanges}
                    placeholder='Title'
                />
                <input
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={handleChanges}
                    placeholder='Director'
                />
                <input
                    type='text'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                    placeholder='Metascore'
                />
                <input
                    type='text'
                    name='stars'
                    value={movie.stars}
                    onChange={handleChanges}
                    placeholder='Stars'
                />
                <button type='submit'>Submit Changes</button>
            </form>
        </div>
    )
};

export default UpdateMovie;
