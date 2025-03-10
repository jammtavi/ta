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

    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Open Movie Details Page
    window.openMovieDetails = function(movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };

    // 🔹 Movie Details Page Logic
    if (window.location.pathname.includes("movie.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        // Dummy movie data (replace with actual data)
        const movies = {
            "movie1": {
                title: "Movie 1",
                description: "This is the description for Movie 1.",
                poster: "images/5794217401691262868.jpg",
                downloadLink: "https://example.com/download/movie1"
            },
            "movie2": {
                title: "Movie 2",
                description: "This is the description for Movie 2.",
                poster: "movie2.jpg",
                downloadLink: "https://example.com/download/movie2"
            },
            "movie3": {
                title: "Movie 3",
                description: "This is the description for Movie 3.",
                poster: "movie3.jpg",
                downloadLink: "https://example.com/download/movie3"
            }
        };

        if (movies[movieId]) {
            document.getElementById("movie-title").textContent = movies[movieId].title;
            document.getElementById("movie-description").textContent = movies[movieId].description;
            document.getElementById("movie-poster").src = movies[movieId].poster;
            document.getElementById("download-button").href = movies[movieId].downloadLink;
        } else {
            document.getElementById("movie-info").innerHTML = "<p>Movie not found.</p>";
        }
    }

    // 🔹 Go Back Function
    window.goBack = function() {
        window.history.back();
    };
});
