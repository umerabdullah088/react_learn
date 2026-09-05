function MovieDetails({ movie, onClose }) {

    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">

            <button
                onClick={onClose}
                className="mb-6 rounded-lg bg-gray-900 px-4 py-2 text-white"
            >
                ← Back
            </button>

            <div className="flex flex-col gap-8 md:flex-row">

                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    alt={movie.Title}
                    className="w-64 rounded-lg"
                />

                <div>

                    <h2 className="text-4xl font-bold">
                        {movie.Title}
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {movie.Year} • {movie.Runtime} • {movie.Rated}
                    </p>

                    <p className="mt-6">
                        {movie.Plot}
                    </p>

                    <p className="mt-4">
                        <strong>Genre:</strong> {movie.Genre}
                    </p>

                    <p className="mt-2">
                        <strong>Director:</strong> {movie.Director}
                    </p>

                    <p className="mt-2">
                        <strong>Actors:</strong> {movie.Actors}
                    </p>

                    <p className="mt-2">
                        <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default MovieDetails;