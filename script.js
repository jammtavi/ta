document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");

    // Open search overlay when clicking search icon
    searchIcon.addEventListener("click", () => {
        searchOverlay.classList.add("active");
    });

    // Close search overlay when clicking cancel
    cancelSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
    });

    // Close search when clicking outside input
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove("active");
        }
    });

    // Movie grid (placeholder for now)
    const movieGrid = document.getElementById("movie-grid");
    const movies = [
        { title: "Movie 1", poster: "https://via.placeholder.com/200x300" },
        { title: "Movie 2", poster: "https://via.placeholder.com/200x300" }
    ];

    function renderMovies() {
        movieGrid.innerHTML = "";
        movies.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    renderMovies();
});
