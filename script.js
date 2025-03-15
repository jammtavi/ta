document.addEventListener("DOMContentLoaded", () => {
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const body = document.body;
    const movieGrid = document.getElementById("movie-grid");

    // Fetch movies
    function fetchAndStoreMovies() {
        const existingMovies = localStorage.getItem("movies");
        if (existingMovies) return JSON.parse(existingMovies);

        const movies = [
            { id: "movie1", title: "Movie 1", description: "A thrilling experience.", poster: "images/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg", downloadLink: "https://example.com/download/movie1" },
            { id: "movie2", title: "Movie 2", description: "Adventure awaits.", poster: "images/447d76a8817d3804243cd2bac16ac7be.jpg", downloadLink: "https://example.com/download/movie2" },
            { id: "movie3", title: "Movie 3", description: "Mystery and suspense.", poster: "images/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg", downloadLink: "https://example.com/download/movie3" }
        ];

        localStorage.setItem("movies", JSON.stringify(movies));
        return movies;
    }

    const storedMovies = fetchAndStoreMovies();

    // 🔹 Open Search
    function openSearch() {
        window.scrollTo(0, 0);
        searchOverlay.classList.add("active");
        document.body.classList.add("search-active");
        setTimeout(() => searchInput.focus(), 150);
    }

    // 🔹 Close Search
    function closeSearch() {
        searchOverlay.classList.remove("active");
        body.classList.remove("search-active");
        searchInput.value = "";
        renderMovies(storedMovies);
    }

    // 🔹 Handle Escape Key for Closing Search Overlay
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Close Search Overlay on Outside Click
    searchOverlay.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
            closeSearch();
        }
    });

    // 🔹 Debounced Search Input
    const searchMovies = debounce(() => {
        const query = normalizeString(searchInput.value);
        const filtered = storedMovies.filter(movie =>
            normalizeString(movie.title).includes(query)
        );
        renderMovies(filtered);
    }, 250);

    // Thumbnail Load Fix
    function renderMovies(movieList) {
        movieGrid.innerHTML = "";
        if (movieList.length === 0) {
            movieGrid.innerHTML = `<p class="loading-text">No movies found.</p>`;
            return;
        }
        movieList.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            
            const movieImg = document.createElement("img");
            movieImg.src = movie.poster;
            movieImg.alt = movie.title;

            // Fix thumbnail loading issues with onerror handler
            movieImg.onerror = function() {
                this.src = 'images/default-thumbnail.jpg'; // Provide fallback image
            };

            movieCard.appendChild(movieImg);

            movieCard.addEventListener("click", () => openMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });
    }

    // 🔹 Handle Clicks Outside Search Container to Close Overlay
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Event listeners
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    searchInput.addEventListener("input", searchMovies);

    if (movieGrid) {
        renderMovies(storedMovies);
    }
});

/* 🔹 Profile Dropdown Handling (Unchanged) */
document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");

    let dropdownActive = false;

    profileIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownActive = !dropdownActive;
        profileMenu.classList.toggle("active", dropdownActive);
    });

    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove("active");
            dropdownActive = false;
        }
    });

    window.addEventListener("scroll", () => {
        profileMenu.classList.remove("active");
        dropdownActive = false;
    });
});

// 🔹 Utility Functions
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
}
