document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        searchOverlay.setAttribute("aria-hidden", "false");
        searchIcon.setAttribute("aria-expanded", "true");

        setTimeout(() => searchInput.focus(), 150);
    }

    function closeSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");

        searchInput.value = "";
        searchInput.blur();

        searchOverlay.setAttribute("aria-hidden", "true");
        searchIcon.setAttribute("aria-expanded", "false");
    }

    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    // 🔹 Load Movies Dynamically
    async function loadMovies() {
        const response = await fetch("movies.json");
        const movies = await response.json();
        const movieGrid = document.getElementById("movie-grid");

        movies.forEach(movie => {
            const article = document.createElement("article");
            article.classList.add("movie-card");
            article.setAttribute("onclick", `openMovieDetails('${movie.id}')`);
            article.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy">
                <h3>${movie.title}</h3>
            `;
            movieGrid.appendChild(article);
        });
    }

    if (document.getElementById("movie-grid")) {
        loadMovies();
    }

    // 🔹 Movie Details Page Logic
    async function loadMovieDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        const response = await fetch("movies.json");
        const movies = await response.json();

        const movie = movies.find(m => m.id === movieId);

        if (movie) {
            document.getElementById("movie-title").textContent = movie.title;
            document.getElementById("movie-description").textContent = movie.description;
            document.getElementById("movie-poster").src = movie.poster;
            document.getElementById("download-button").href = movie.downloadLink;
        } else {
            document.getElementById("movie-info").innerHTML = "<p>Movie not found.</p>";
        }
    }

    if (window.location.pathname.includes("movie.html")) {
        loadMovieDetails();
    }

    // 🔹 Go Back Function
    window.goBack = function() {
    if (document.referrer && document.referrer.includes(window.location.origin)) {
        window.history.back();
    } else {
        window.location.href = "index.html"; // Redirect to home if no history
    }
};


    // 🔹 Open Movie Details
    window.openMovieDetails = function(movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };
});
