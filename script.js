document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const movieGrid = document.getElementById("movie-grid");

    // Function to open search overlay
    function openSearch() {
        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        document.body.classList.add("search-active");
        searchInput.focus();
    }

    // Function to close search overlay
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        document.body.classList.remove("search-active");
    }

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    // Close search when clicking outside input
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Close search on ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // Sample Movie Data
    const movies = [
        { id: 1, title: "Movie 1", image: "poster1.jpg", description: "A thrilling adventure.", download: "link1.com" },
        { id: 2, title: "Movie 2", image: "poster2.jpg", description: "An exciting horror film.", download: "link2.com" },
        { id: 3, title: "Movie 3", image: "poster3.jpg", description: "A gripping drama.", download: "link3.com" }
    ];

    // Function to Load Movies on Homepage
    function loadMovies() {
        movieGrid.innerHTML = "";
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="details-btn" onclick="openMovieDetails(${movie.id})">View Details</button>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    // Function to Open Movie Details Page
    window.openMovieDetails = (id) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            localStorage.setItem("movieData", JSON.stringify(movie));
            window.location.href = "movie.html";
        }
    };

    // Load Movie Details Page
    if (window.location.pathname.includes("movie.html")) {
        const movieData = JSON.parse(localStorage.getItem("movieData"));
        if (movieData) {
            document.getElementById("movie-title").innerText = movieData.title;
            document.getElementById("movie-description").innerText = movieData.description;
            document.getElementById("movie-poster").src = movieData.image;
            document.getElementById("download-button").href = movieData.download;
        }
    }

    // Load Movies on Homepage
    if (movieGrid) {
        loadMovies();
    }
});
