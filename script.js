document.addEventListener("DOMContentLoaded", () => {
    const movieGrid = document.getElementById("movie-grid");
    const movieSearch = document.getElementById("movie-search");
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    // 🔹 Sample Movie Data (Can be replaced with API data)
    const movies = [
        {
            title: "Movie One",
            image: "https://via.placeholder.com/300x450",
            description: "A thrilling action movie with unexpected twists.",
            downloadLink: "#",
            detailsPage: "movie-details.html?title=Movie%20One"
        },
        {
            title: "Movie Two",
            image: "https://via.placeholder.com/300x450",
            description: "A horror movie that will keep you on edge!",
            downloadLink: "#",
            detailsPage: "movie-details.html?title=Movie%20Two"
        },
        {
            title: "Movie Three",
            image: "https://via.placeholder.com/300x450",
            description: "A sci-fi adventure beyond imagination.",
            downloadLink: "#",
            detailsPage: "movie-details.html?title=Movie%20Three"
        }
    ];

    // 🔹 Load Movies into the Grid
    function loadMovies() {
        movieGrid.innerHTML = ""; // Clear existing movies
        movies.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <a href="${movie.detailsPage}">
                    <img src="${movie.image}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                </a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    // 🔹 Filter Movies in Real-Time
    function filterMovies() {
        const searchValue = movieSearch.value.toLowerCase();
        document.querySelectorAll(".movie-card").forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 🔹 Search Overlay Functions
    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        setTimeout(() => {
            movieSearch.focus();
            isSearchAnimating = false;
        }, 150);
    }

    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        movieSearch.value = "";
        filterMovies(); // Reset search
    }

    // 🔹 Prevent Double Animations
    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    // 🔹 Event Listeners
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);
    movieSearch.addEventListener("keyup", filterMovies);

    // 🔹 Close Search on Outside Click
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // 🔹 Close Search on ESC Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Load Movies on Page Load
    loadMovies();
});
