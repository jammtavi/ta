document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Search Functionality Variables
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    // 🔹 Movie Grid & Details Variables
    const movieGrid = document.getElementById("movie-grid");
    const movieDetails = document.getElementById("movie-details");
    const goBackBtn = document.getElementById("go-back");
    const downloadBtn = document.getElementById("download-movie");

    const movieTitle = document.getElementById("movie-title");
    const movieDescription = document.getElementById("movie-description");
    const movieThumbnail = document.getElementById("movie-thumbnail");

    // 🔹 Sample Movie Data (Replace with API Fetch Later)
    const movies = [
        {
            title: "Inception",
            description: "A skilled thief enters dreams to steal secrets.",
            thumbnail: "https://via.placeholder.com/150",
            downloadLink: "https://example.com/inception.mp4"
        },
        {
            title: "Interstellar",
            description: "A journey beyond the stars to save humanity.",
            thumbnail: "https://via.placeholder.com/150",
            downloadLink: "https://example.com/interstellar.mp4"
        }
    ];

    // 🔹 Function: Open Search Bar
    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        setTimeout(() => searchInput.focus(), 150); // Slight delay for better UX
    }

    // 🔹 Function: Close Search Bar
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchInput.value = "";
        searchInput.blur();
    }

    // 🔹 Listen for Transition End to Reset Animation Flag
    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    // 🔹 Event Listeners for Search
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    // 🔹 Close Search on Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Function: Display Movies in Grid
    function displayMovies() {
        movieGrid.innerHTML = "";
        movies.forEach((movie, index) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;

            // Click to View Movie Details
            movieCard.addEventListener("click", () => showMovieDetails(index));

            movieGrid.appendChild(movieCard);
        });
    }

    // 🔹 Function: Show Movie Details Page
    function showMovieDetails(index) {
        const movie = movies[index];

        movieTitle.textContent = movie.title;
        movieDescription.textContent = movie.description;
        movieThumbnail.src = movie.thumbnail;
        downloadBtn.href = movie.downloadLink;

        movieGrid.classList.add("hidden");
        movieDetails.classList.remove("hidden");
    }

    // 🔹 Go Back to Movie Grid
    goBackBtn.addEventListener("click", () => {
        movieDetails.classList.add("hidden");
        movieGrid.classList.remove("hidden");
    });

    // 🔹 Load Movies on Page Load
    displayMovies();
});
