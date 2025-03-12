document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const movieGrid = document.getElementById("movie-grid");
    const body = document.body;

    // 🔹 Movie Data (Dynamic)
    const movies = [
        { id: "movie1", title: "Movie 1", description: "This is the description for Movie 1.", poster: "images/5794217401691262868.jpg", downloadLink: "https://example.com/download/movie1" },
        { id: "movie2", title: "Movie 2", description: "This is the description for Movie 2.", poster: "images/movie2.jpg", downloadLink: "https://example.com/download/movie2" },
        { id: "movie3", title: "Movie 3", description: "This is the description for Movie 3.", poster: "images/movie3.jpg", downloadLink: "https://example.com/download/movie3" }
    ];

    // 🔹 Open Search Overlay
    function openSearch() {
        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");
        setTimeout(() => searchInput.focus(), 150);
    }

    // 🔹 Close Search Overlay
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchInput.value = "";
        searchInput.blur();
        renderMovies(movies); // Restore full movie list
    }

    // 🔹 Filter Movies Based on Search Query
    function searchMovies() {
        let query = searchInput.value.toLowerCase();
        let filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    }

    // 🔹 Render Movies in the Grid
    function renderMovies(movieList) {
        movieGrid.innerHTML = "";
        if (movieList.length === 0) {
            movieGrid.innerHTML = `<p class="loading-text">No movies found.</p>`;
            return;
        }
        movieList.forEach(movie => {
            const movieCard = document.createElement("article");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title} Poster">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener("click", () => openMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });
    }

    // 🔹 Open Movie Details Page
    window.openMovieDetails = function(movieId) {
        if (window.location.pathname.includes("movie.html") && new URLSearchParams(window.location.search).get("id") === movieId) {
            return;
        }
        window.location.href = `movie.html?id=${movieId}`;
    };

    // 🔹 Load Movie Details on `movie.html`
    if (window.location.pathname.includes("movie.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");
        const movie = movies.find(m => m.id === movieId);

        if (movie) {
            document.getElementById("movie-title").textContent = movie.title;
            document.getElementById("movie-description").textContent = movie.description;
            document.getElementById("movie-poster").src = movie.poster;
            document.getElementById("download-button").href = movie.downloadLink;
        } else {
            window.location.href = "index.html"; // Redirect if movie not found
        }
    }

    // 🔹 Go Back Function
    window.goBack = function() {
        window.history.back();
    };

    // 🔹 Event Listeners
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    searchInput.addEventListener("input", searchMovies);
    searchInput.addEventListener("keyup", searchMovies); // 🔹 Fix: Search updates as user types

    // 🔹 Initialize Movies on Home Page
    if (movieGrid) {
        renderMovies(movies);
    }
});
