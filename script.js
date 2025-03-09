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

        setTimeout(() => {
            searchInput.focus();
            isSearchAnimating = false;
        }, 300);
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

        setTimeout(() => {
            isSearchAnimating = false;
        }, 300);
    }

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    // 🔹 Load Movies with Caching
    async function loadMovies() {
        const movieGrid = document.getElementById("movie-grid");

        try {
            let movies;
            if (sessionStorage.getItem("movies")) {
                movies = JSON.parse(sessionStorage.getItem("movies"));
            } else {
                const response = await fetch("movies.json");
                movies = await response.json();
                sessionStorage.setItem("movies", JSON.stringify(movies)); 
            }

            movies.forEach(movie => {
                const article = document.createElement("article");
                article.classList.add("movie-card");
                article.setAttribute("onclick", `openMovieDetails('${movie.id}')`);
                article.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy" onerror="this.src='default-placeholder.jpg'">
                    <h3>${movie.title}</h3>
                `;
                movieGrid.appendChild(article);
            });
        } catch (error) {
            console.error("Error loading movies:", error);
            movieGrid.innerHTML = "<p>Failed to load movies.</p>";
        }
    }

    if (document.getElementById("movie-grid")) {
        loadMovies();
    }

    // 🔹 Load Movie Details
    async function loadMovieDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        if (!movieId) {
            document.getElementById("movie-info").innerHTML = "<p>Movie not found.</p>";
            return;
        }

        try {
            const response = await fetch("movies.json");
            const movies = await response.json();
            const movie = movies.find(m => m.id === movieId);

            if (movie) {
                document.getElementById("movie-title").textContent = movie.title;
                document.getElementById("movie-description").textContent = movie.description || "No description available.";
                document.getElementById("movie-poster").src = movie.poster;
                document.getElementById("download-button").href = movie.downloadLink || "#";

                document.querySelector('meta[name="description"]').setAttribute("content", movie.description || "Movie details page.");
            } else {
                document.getElementById("movie-info").innerHTML = "<p>Movie not found.</p>";
            }
        } catch (error) {
            console.error("Error loading movie details:", error);
            document.getElementById("movie-info").innerHTML = "<p>Error fetching movie details.</p>";
        }
    }

    if (window.location.pathname.includes("movie.html")) {
        loadMovieDetails();
    }

    // 🔹 Go Back Function
    window.goBack = function() {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    };

    // 🔹 Open Movie Details
    window.openMovieDetails = function(movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };
});
