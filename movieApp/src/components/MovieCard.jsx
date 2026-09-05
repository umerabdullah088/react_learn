function MovieCard({ movie, onSelect }) {
    return (
        <div
            onClick={() => onSelect(movie.imdbID)}
            className="w-56 cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105"
        >

            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.Title}
                className="h-80 w-full object-cover"
            />

            <div className="p-4">

                <h3 className="text-lg font-bold">
                    {movie.Title}
                </h3>

                <p className="mt-1 text-gray-500">
                    {movie.Year}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    {movie.Type}
                </p>

            </div>

        </div>
    );
}

export default MovieCard;