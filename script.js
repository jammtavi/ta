document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const movieGrid = document.getElementById("movie-grid");
    const body = document.body;
    const authModal = document.getElementById("auth-modal");
    const closeModal = document.querySelector(".close-modal");
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");

    // 🔹 Store Movies in Local Storage (Only if not already stored)
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

    // 🔹 Open Search Overlay
    searchIcon.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        body.classList.add("search-active"); 
        setTimeout(() => searchInput.focus(), 150);
    });

    // 🔹 Close Search Overlay
    cancelSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        body.classList.remove("search-active"); 
        searchInput.value = "";
        renderMovies(storedMovies);
    });

    // 🔹 Debounce Function (Optimized Search Performance)
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => requestAnimationFrame(() => func.apply(this, args)), delay);
        };
    }

    // 🔹 Filter Movies Based on Search Query
    function searchMovies() {
        let query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderMovies(storedMovies);
            return;
        }
        let filteredMovies = storedMovies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    }

    const debouncedSearch = debounce(searchMovies, 250);
    searchInput.addEventListener("input", debouncedSearch);

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

            // 🔹 Append a timestamp to prevent caching issues
            const imgSrc = `${movie.poster}?t=${new Date().getTime()}`;

            movieCard.innerHTML = `
                <img src="${imgSrc}" alt="${movie.title} Poster" loading="lazy">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener("click", () => openMovieDetails(movie.id));
            movieGrid.appendChild(movieCard);
        });
    }

    // 🔹 Open Movie Details Page
    window.openMovieDetails = function (movieId) {
        window.location.href = `movie.html?id=${movieId}`;
    };

    // 🔹 Load Movie Details on `movie.html`
    if (window.location.pathname.includes("movie.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get("id");

        let movies = localStorage.getItem("movies");
        movies = movies ? JSON.parse(movies) : fetchAndStoreMovies();
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
    }

    // 🔹 Go Back Function
    window.goBack = function () {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "index.html"; 
        }
    };

    // 🔹 Profile Dropdown Handling
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

    // 🔹 Login/Signup Modal Handling
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    profileIcon.addEventListener("click", (event) => {
        authModal.classList.add("active");
        event.stopPropagation();
    });

    closeModal.addEventListener("click", () => {
        authModal.classList.remove("active");
    });

    loginTab.addEventListener("click", () => {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
    });

    signupTab.addEventListener("click", () => {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
    });

    document.getElementById("signup-button").addEventListener("click", () => {
        alert("Signup Successful!");
    });

    document.getElementById("login-button").addEventListener("click", () => {
        alert("Login Successful!");
    });

    if (movieGrid) {
        renderMovies(storedMovies);
    }
});
