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

    // 🔹 Store Movies in Local Storage (if not already stored)
    if (!localStorage.getItem("movies")) {
        localStorage.setItem("movies", JSON.stringify(movies));
    }

    // Retrieve Movies from Local Storage
    const storedMovies = JSON.parse(localStorage.getItem("movies"));

    // 🔹 Open Search Overlay
    function openSearch() {
        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");
        document.documentElement.style.overflow = "hidden"; // Prevent scrolling
        setTimeout(() => searchInput.focus(), 150);
    }

    // 🔹 Close Search Overlay
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        document.documentElement.style.overflow = ""; // Restore scrolling
        searchInput.value = "";
        searchInput.blur();
        renderMovies(storedMovies); // Restore full movie list
    }

    // 🔹 Debounce Function (Optimize Search Performance)
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // 🔹 Filter Movies Based on Search Query
    function searchMovies() {
        let query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderMovies(storedMovies); // Show all movies if empty
            return;
        }
        let filteredMovies = storedMovies.filter(movie => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
    }

    const debouncedSearch = debounce(searchMovies, 300); // 🔥 Reduces API calls

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
                <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy">
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

        // Retrieve Movie Data from Local Storage
        const movie = storedMovies.find(m => m.id === movieId);

        if (movie) {
            document.getElementById("movie-title").textContent = movie.title;
            document.getElementById("movie-description").textContent = movie.description;
            document.getElementById("movie-poster").src = movie.poster;

            // Handle download button
            const downloadButton = document.getElementById("download-button");
            if (movie.downloadLink) {
                downloadButton.href = movie.downloadLink;
                downloadButton.style.display = "inline-block";
            } else {
                downloadButton.style.display = "none";
            }
        } else {
            document.getElementById("movie-details").innerHTML = `<p class="loading-text">Movie not found.</p>`;
        }
    }

    // 🔹 Go Back Function
    window.goBack = function () {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "index.html"; // Fallback to home
        }
    };

    // 🔹 Event Listeners
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    searchInput.addEventListener("input", debouncedSearch);

    // 🔹 Initialize Movies on Home Page
    if (movieGrid) {
        renderMovies(storedMovies);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");

    // 🔹 Toggle Dropdown Menu
    profileIcon.addEventListener("click", (event) => {
        profileMenu.classList.toggle("active");
        event.stopPropagation(); // Prevents immediate closure when clicking the icon
    });

    // 🔹 Close Dropdown When Clicking Outside
    document.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.remove("active");
        }
    });

    // 🔹 Close Dropdown on Scroll
    window.addEventListener("scroll", () => {
        profileMenu.classList.remove("active");
    });
});
