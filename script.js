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
        setTimeout(() => searchInput.focus(), 150);
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
                <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy" class="lazy-load">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener("click", () => openMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });

        // ✅ Improved Lazy Loading using IntersectionObserver
        const lazyImages = document.querySelectorAll(".lazy-load");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("loaded");
                }
            });
        }, { threshold: 0.1 });

        lazyImages.forEach(img => observer.observe(img));
    }

    window.openMovieDetails = function (movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };

    if (window.location.pathname.includes("movie.html")) {
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const movieId = urlParams.get("id");

            const movieTitle = document.getElementById("movie-title");
            const movieDescription = document.getElementById("movie-description");
            const moviePoster = document.getElementById("movie-poster");
            const downloadButton = document.getElementById("download-button");
            const movieDetails = document.getElementById("movie-details");
            const preloader = document.getElementById("preloader");
            const errorMessage = document.getElementById("error-message");

            if (!movieId) {
                showErrorAndRedirect();
                return;
            }

            // ✅ Fetch stored movies
            const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

            const movie = storedMovies.find(m => m.id === movieId);

            if (movie) {
                // ✅ Display movie details
                movieTitle.textContent = movie.title;
                movieDescription.textContent = movie.description;
                moviePoster.src = movie.poster;
                moviePoster.alt = `${movie.title} Poster`;

                // ✅ Set download button link
                if (movie.downloadLink) {
                    downloadButton.href = movie.downloadLink;
                    downloadButton.style.display = "inline-block";
                } else {
                    downloadButton.style.display = "none";
                }

                // ✅ Show content after preloader disappears
                setTimeout(() => {
                    preloader.style.display = "none";
                    movieDetails.style.display = "block";
                }, 1000);
            } else {
                showErrorAndRedirect();
            }

            function showErrorAndRedirect() {
                preloader.style.display = "none";
                errorMessage.style.display = "block";
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 3000);
            }
        });
    }

    /* ✅ Go Back Function */
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

/* ✅ Improved Profile Dropdown Handling */
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
        if (Math.abs(window.scrollY - lastScrollY) > 30) {
            profileMenu.classList.remove("active");
            dropdownActive = false;
        }
        lastScrollY = window.scrollY;
    });

    // ✅ Fix Dropdown Animation
    profileMenu.addEventListener("transitionend", () => {
        if (!profileMenu.classList.contains("active")) {
            profileMenu.style.visibility = "hidden";
        } else {
            profileMenu.style.visibility = "visible";
        }
    });
});
