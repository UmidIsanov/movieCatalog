
export interface Movie {
    id: number,
    name: string,
    vote_average: number,
    first_air_date: string,
    poster_path: string,
    backdrop_path: string,
    title: string,
    origin_country: string,
    overview: string
    logoImg: string
    logoDB: string
    
   
}
export interface IPopularMovie {
    page: number
    results: Movie
    }
