document.addEventListener("DOMContentLoaded", () => {
    // Search Bar Popup
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

    // Placeholder Movie Grid (for testing)
    const movieGrid = document.getElementById("movie-grid");

    // Example movie data (replace with real database in future)
    const movies = [
        { title: "Movie 1", poster: "https://via.placeholder.com/200x300", link: "#" },
        { title: "Movie 2", poster: "https://via.placeholder.com/200x300", link: "#" },
        { title: "Movie 3", poster: "https://via.placeholder.com/200x300", link: "#" },
        { title: "Movie 4", poster: "https://via.placeholder.com/200x300", link: "#" },
    ];

    function renderMovies() {
        movieGrid.innerHTML = "";
        movies.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <a href="${movie.link}">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    // Render movies on page load
    renderMovies();
});
