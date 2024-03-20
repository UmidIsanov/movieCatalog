import { FC } from "react";
import { useFetchPopularMoviesQuery } from "../../services/PopularMovieService";
import { IPopularMovie } from "../../types/IPopularMovie";
const PopularMovie: FC = () => {
  const { data, isError, isLoading } = useFetchPopularMoviesQuery();

  if (isError) {
    return <p>Oh shit, you got an error!</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !Array.isArray(data.results)) {
    return <p>No popular movies found.</p>;
  }
  console.log(data);
  const popularMovies: IPopularMovie[] = data.results;

  return (
    <>
      {popularMovies.map((popularMovie: IPopularMovie) => (
        <h1 key={popularMovie.id}>{popularMovie.original_title}</h1>
      ))}
    </>
  );
};

export default PopularMovie;
