document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    const movieGrid = document.getElementById("movie-grid");

    // Sample movie data
    const movies = [
        { id: 1, title: "The Dark Knight", thumbnail: "https://via.placeholder.com/150", description: "A thrilling Batman movie." },
        { id: 2, title: "Inception", thumbnail: "https://via.placeholder.com/150", description: "A mind-bending sci-fi adventure." },
        { id: 3, title: "Interstellar", thumbnail: "https://via.placeholder.com/150", description: "A space journey beyond imagination." },
        { id: 4, title: "Joker", thumbnail: "https://via.placeholder.com/150", description: "The origin of Gotham's most feared villain." }
    ];

    // Function to display movies
    function displayMovies(filteredMovies = movies) {
        movieGrid.innerHTML = ""; // Clear existing movies
        filteredMovies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML = `
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            card.addEventListener("click", () => {
                localStorage.setItem("selectedMovie", JSON.stringify(movie));
                window.location.href = "movie.html";
            });
            movieGrid.appendChild(card);
        });
    }

    // Function to open search overlay
    function openSearch() {
        searchOverlay.classList.add("active");
        topNav.classList.add("hidden"); // Hide Navbar
        body.classList.add("search-active"); // Prevent Scroll
        searchInput.focus(); // Auto-focus input
    }

    // Function to close search overlay
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden"); // Show Navbar
        body.classList.remove("search-active"); // Enable Scroll
        searchInput.blur(); // Remove focus from input
    }

    // Function to search movies
    function searchMovies() {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        displayMovies(filteredMovies);
    }

    // Load movies on page load
    displayMovies();

    // Open search overlay when clicking search icon
    searchIcon.addEventListener("click", openSearch);

    // Close search overlay when clicking cancel
    cancelSearch.addEventListener("click", closeSearch);

    // Close search when clicking outside input
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Close search on ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // Search input event
    searchInput.addEventListener("input", searchMovies);
});
