document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    const movieGrid = document.getElementById("movie-grid");
    let lastScrollTop = 0;
    let isSearchAnimating = false;

    /** 🔹 Open Search Overlay */
    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        setTimeout(() => {
            searchInput.focus();
            isSearchAnimating = false;
        }, 150); // Slight delay for smoother UX
    }

    /** 🔹 Close Search Overlay */
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchInput.value = "";
        searchInput.blur();
    }

    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    /** 🔹 Close Search on Overlay Click */
    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    /** 🔹 Close Search with Escape Key */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    /** 🔹 Auto-hide Navigation on Scroll */
    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            topNav.classList.add("scroll-hide"); // Hide when scrolling down
        } else {
            topNav.classList.remove("scroll-hide"); // Show when scrolling up
        }
        lastScrollTop = scrollTop;
    });

    /** 🔹 Load Movies Dynamically */
    function loadMovies() {
        const movies = [
            { title: "Movie 1", img: "https://via.placeholder.com/150" },
            { title: "Movie 2", img: "https://via.placeholder.com/150" },
            { title: "Movie 3", img: "https://via.placeholder.com/150" },
            { title: "Movie 4", img: "https://via.placeholder.com/150" },
            { title: "Movie 5", img: "https://via.placeholder.com/150" }
        ];

        movieGrid.innerHTML = ""; // Clear loading text
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="${movie.img}" alt="${movie.title}" loading="lazy">
                <p>${movie.title}</p>
            `;

            movieGrid.appendChild(movieCard);
        });
    }

    // Call function to load movies
    loadMovies();
});
