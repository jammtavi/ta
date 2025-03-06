document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    /* 🔹 Open Search */
    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        searchIcon.setAttribute("aria-expanded", "true");

        setTimeout(() => {
            searchInput.focus();
            isSearchAnimating = false;
        }, 150);
    }

    /* 🔹 Close Search */
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");

        searchIcon.setAttribute("aria-expanded", "false");

        searchInput.value = "";
        searchInput.blur();
    }

    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    /* 🔹 Close Search When Clicking Outside */
    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    /* 🔹 Close Search on ESC Key */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    /* 🔹 Open Movie Details Page */
    window.openMovieDetails = (movieId, title, genre, duration, description, imageUrl) => {
        const movieData = {
            id: movieId,
            title,
            genre,
            duration,
            description,
            imageUrl
        };
        localStorage.setItem("movieDetails", JSON.stringify(movieData));
        window.location.href = "movie.html";
    };

    /* 🔹 Load Movie Details on movie.html */
    if (window.location.pathname.endsWith("movie.html")) {
        const movieData = JSON.parse(localStorage.getItem("movieDetails"));

        if (movieData) {
            document.getElementById("movie-title").innerText = movieData.title;
            document.getElementById("movie-genre").innerText = "Genre: " + movieData.genre;
            document.getElementById("movie-duration").innerText = "Duration: " + movieData.duration;
            document.getElementById("movie-description").innerText = movieData.description;
            document.getElementById("movie-thumbnail").src = movieData.imageUrl;
        } else {
            document.getElementById("movie-details-container").innerHTML = "<p>Error: No movie details found.</p>";
        }

        /* 🔹 Show Download Button After 2s */
        setTimeout(() => {
            document.getElementById("download-btn").style.display = "block";
        }, 2000);
    }
});
