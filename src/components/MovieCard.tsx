import {FC} from 'react'
import { Movie } from '../types/movieTypes'
interface MovieCardIProps {
    movie: Movie

}

const  MovieCard: FC <MovieCardIProps> = ({movie}) => {
    
  return (
    <div className="movie-card" >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.name}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.name}</h2>
            <p className="movie-rating">Рейтинг: {movie.vote_average}</p>
            <p className="movie-release-date">
              Дата выхода: {movie.first_air_date}
            </p>
        
            <p className="movie-overview">Описание: {movie.overview}</p>
          </div>
  )
}

export default MovieCard