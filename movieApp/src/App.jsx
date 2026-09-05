import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import useMovies from "./hooks/useMovies";
import MovieDetails from "./components/MovieDetails";

function App() {

  const {
    movies,
    loading,
    error,
    searchMovies,
    loadMore,
    selectedMovie,
    getMovieDetails,
    clearSelectedMovie

  } = useMovies();

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="p-8">

        <h2 className="text-4xl font-bold">
          Find Your Favorite Movies
        </h2>

        <p className="mt-2 text-gray-600">
          Search for movies and discover something great.
        </p>

        <SearchBar onSearch={searchMovies} />

        {loading && (
          <p className="mt-8 text-lg font-semibold">
            Loading movies...
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-600">
            {error}
          </p>
        )}


        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={clearSelectedMovie}
          />
        )}
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">

          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={getMovieDetails}
            />
          ))}

        </div>

        {movies.length > 0 && !loading && (
          <div className="mt-10 flex justify-center">

            <button
              onClick={loadMore}
              className="rounded-lg bg-gray-900 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Load More
            </button>

          </div>
        )}

      </main>

    </div>
  );
}

export default App;