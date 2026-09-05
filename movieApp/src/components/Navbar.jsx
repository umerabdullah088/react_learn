function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
                🎬 MovieHub
            </h1>

            <div className="flex gap-6">
                <button>Home</button>
                <button>Favorites</button>
            </div>
        </nav>
    );
}

export default Navbar;