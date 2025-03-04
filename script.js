document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    const movieGrid = document.getElementById("movie-grid");
    const movieModal = document.getElementById("movie-modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close-modal");
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
        }, 150); // Delay for smoother UX
    }

    /** 🔹 Close Search Overlay */
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchInput.value = "";
        searchInput.blur();
    }

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    /** 🔹 Close Search on Click Outside */
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
            { 
                title: "Movie 1", 
                img: "https://via.placeholder.com/300x450", 
                description: "An exciting action movie with breathtaking scenes.",
                downloadLink: "#"
            },
            { 
                title: "Movie 2", 
                img: "https://via.placeholder.com/300x450", 
                description: "A mystery thriller that will keep you on the edge.",
                downloadLink: "#"
            },
            { 
                title: "Movie 3", 
                img: "https://via.placeholder.com/300x450", 
                description: "A romantic drama that will touch your heart.",
                downloadLink: "#"
            },
            { 
                title: "Movie 4", 
                img: "https://via.placeholder.com/300x450", 
                description: "An adventure movie with stunning visuals.",
                downloadLink: "#"
            }
        ];

        movieGrid.innerHTML = ""; // Clear loading text
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="${movie.img}" alt="${movie.title}" loading="lazy">
                <p>${movie.title}</p>
            `;

            // Click event to show movie details
            movieCard.addEventListener("click", () => openMovieModal(movie));

            movieGrid.appendChild(movieCard);
        });
    }

    /** 🔹 Open Movie Details Modal */
    function openMovieModal(movie) {
        modalContent.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="${movie.img}" alt="${movie.title}" loading="lazy">
            <p>${movie.description}</p>
            <a href="${movie.downloadLink}" class="download-btn">Download Movie</a>
        `;
        movieModal.classList.add("active");
        body.classList.add("modal-active");
    }

    /** 🔹 Close Movie Modal */
    closeModal.addEventListener("click", () => {
        movieModal.classList.remove("active");
        body.classList.remove("modal-active");
    });

    /** 🔹 Close Modal with Escape Key */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && movieModal.classList.contains("active")) {
            movieModal.classList.remove("active");
            body.classList.remove("modal-active");
        }
    });

    /** 🔹 Close Modal on Click Outside */
    movieModal.addEventListener("click", (e) => {
        if (e.target === movieModal) {
            movieModal.classList.remove("active");
            body.classList.remove("modal-active");
        }
    });

    // Load Movies on Page Load
    loadMovies();
});
