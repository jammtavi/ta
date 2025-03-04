document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Elements for Search Bar
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    // 🔹 Elements for Movie Grid & Details Page
    const movieGrid = document.getElementById("movie-grid");
    const movieDetails = document.getElementById("movie-details");
    const goBackBtn = document.getElementById("go-back");
    const downloadBtn = document.getElementById("download-movie");
    const movieTitle = document.getElementById("movie-title");
    const movieDescription = document.getElementById("movie-description");
    const movieThumbnail = document.getElementById("movie-thumbnail");

    // 🔹 Sample Movie Data
    const movies = [
        { 
            title: "Inception", 
            description: "A skilled thief enters dreams to steal secrets.", 
            thumbnail: "https://via.placeholder.com/250", 
            downloadLink: "https://example.com/inception.mp4"
        },
        { 
            title: "Interstellar", 
            description: "A journey beyond the stars to save humanity.", 
            thumbnail: "https://via.placeholder.com/250", 
            downloadLink: "https://example.com/interstellar.mp4"
        },
        { 
            title: "The Dark Knight", 
            description: "A hero must rise to save Gotham from chaos.", 
            thumbnail: "https://via.placeholder.com/250", 
            downloadLink: "https://example.com/thedarkknight.mp4"
        }
    ];

    // 🔹 Function: Display Movies in Grid
    function displayMovies(filter = "") {
        if (!movieGrid) return; // Ensure we're on the correct page

        movieGrid.innerHTML = "";

        movies.forEach((movie, index) => {
            if (filter && !movie.title.toLowerCase().includes(filter.toLowerCase())) {
                return; // Skip movies that don't match the search
            }

            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;

            // Click to View Movie Details
            movieCard.addEventListener("click", () => {
                localStorage.setItem("selectedMovie", JSON.stringify(movie));
                window.location.href = "moviedetails.html";
            });

            movieGrid.appendChild(movieCard);
        });

        if (movieGrid.innerHTML === "") {
            movieGrid.innerHTML = "<p class='no-results'>No movies found.</p>";
        }
    }

    // 🔹 Function: Load Movie Details Page
    function loadMovieDetails() {
        const movie = JSON.parse(localStorage.getItem("selectedMovie"));

        if (movie) {
            movieTitle.textContent = movie.title;
            movieDescription.textContent = movie.description;
            movieThumbnail.src = movie.thumbnail;
            downloadBtn.href = movie.downloadLink;
        } else {
            document.getElementById("movie-details").innerHTML = "<p>Error: Movie not found.</p>";
        }

        // "Go Back" button functionality
        goBackBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // 🔹 Search Bar Functionality
    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        setTimeout(() => searchInput.focus(), 150);
    }

    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchInput.value = "";
        searchInput.blur();
        displayMovies();
    }

    // 🔹 Event Listeners for Search
    if (searchIcon) searchIcon.addEventListener("click", openSearch);
    if (cancelSearch) cancelSearch.addEventListener("click", closeSearch);
    
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            displayMovies(searchInput.value);
        });
    }

    // 🔹 Close Search on Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Check Which Page We're On & Execute the Right Function
    if (movieGrid) {
        displayMovies(); // Load Movies if on Index Page
    } else if (movieDetails) {
        loadMovieDetails(); // Load Movie Details if on Details Page
    }
});
