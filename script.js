document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const movieGrid = document.getElementById("movie-grid");
    const body = document.body;

    function fetchAndStoreMovies() {
        const existingMovies = localStorage.getItem("movies");
        if (existingMovies) return JSON.parse(existingMovies);

        const movies = [
            { id: "movie1", title: "Movie 1", description: "A thrilling movie experience.", poster: "images/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg", downloadLink: "https://example.com/download/movie1" },
            { id: "movie2", title: "Movie 2", description: "A breathtaking adventure.", poster: "images/447d76a8817d3804243cd2bac16ac7be.jpg", downloadLink: "https://example.com/download/movie2" },
            { id: "movie3", title: "Movie 3", description: "A suspenseful mystery.", poster: "images/3-316-16-9-aspect-ratio-s-sfw-wallpaper-preview.jpg", downloadLink: "https://example.com/download/movie3" }
        ];

        localStorage.setItem("movies", JSON.stringify(movies));
        return movies;
    }

    const storedMovies = fetchAndStoreMovies();

    function openSearch() {
        searchOverlay.classList.add("active");
        body.classList.add("search-active");
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove("active");
        body.classList.remove("search-active");
        searchInput.value = "";
        renderMovies(storedMovies);
    }

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => requestAnimationFrame(() => func.apply(this, args)), delay);
        };
    }

    function normalizeString(str) {
        return str.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
    }

    function searchMovies() {
        let query = normalizeString(searchInput.value.trim());
        if (!query) {
            renderMovies(storedMovies);
            return;
        }
        let filteredMovies = storedMovies.filter(movie => normalizeString(movie.title).includes(query));
        renderMovies(filteredMovies);
    }

    const debouncedSearch = debounce(searchMovies, 250);

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
                <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener("click", () => openMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });
    }

    window.openMovieDetails = function (movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };

    if (window.location.pathname.includes("movie.html")) {
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const movieId = urlParams.get("id");

            let movies = JSON.parse(localStorage.getItem("movies") || "[]");
            const movie = movies.find(m => m.id === movieId);

            if (movie) {
                document.getElementById("movie-title").textContent = movie.title;
                document.getElementById("movie-description").textContent = movie.description;
                document.getElementById("movie-poster").src = movie.poster;

                const downloadButton = document.getElementById("download-button");
                if (movie.downloadLink) {
                    downloadButton.href = movie.downloadLink;
                    downloadButton.style.display = "inline-block";
                } else {
                    downloadButton.style.display = "none";
                }
            } else {
                document.getElementById("movie-details").innerHTML = `<p class="loading-text">Movie not found.</p>`;
                setTimeout(() => window.location.href = "index.html", 3000);
            }
        });
    }

    window.goBack = function () {
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    };

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    searchInput.addEventListener("input", debouncedSearch);

    if (movieGrid) {
        renderMovies(storedMovies);
    }
});

/* 🔹 Profile Dropdown Handling */
document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");

    let dropdownActive = false;

    profileIcon.addEventListener("click", (event) => {
        dropdownActive = !dropdownActive;
        profileMenu.classList.toggle("active", dropdownActive);
        event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove("active");
            dropdownActive = false;
        }
    });

    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        if (dropdownActive && Math.abs(window.scrollY - lastScrollY) > 30) {
            profileMenu.classList.remove("active");
            dropdownActive = false;
        }
        lastScrollY = window.scrollY;
    });
});
