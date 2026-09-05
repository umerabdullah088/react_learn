import { useState, useEffect } from "react";

function useMovies() {

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {

        if (!query) {
            setMovies([]);
            return;
        }

        async function fetchMovies() {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}&page=${page}`
                );

                const data = await response.json();

                if (data.Response === "False") {
                    throw new Error(data.Error);
                }

                if (page === 1) {

                    setMovies(data.Search || []);

                } else {

                    setMovies(prevMovies => [
                        ...prevMovies,
                        ...(data.Search || [])
                    ]);

                }

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }

        }

        fetchMovies();

    }, [query, page]);


    function searchMovies(searchText) {

        setPage(1);
        setMovies([]);
        setQuery(searchText);

    }


    function loadMore() {

        setPage(prevPage => prevPage + 1);

    }


    async function getMovieDetails(imdbID) {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
            );

            const data = await response.json();

            if (data.Response === "False") {
                throw new Error(data.Error);
            }

            setSelectedMovie(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }

    function clearSelectedMovie() {
        setSelectedMovie(null);
    }
    return {
        movies,
        loading,
        error,
        searchMovies,
        loadMore,
        selectedMovie,
        getMovieDetails,
        clearSelectedMovie,

    };
}

export default useMovies;