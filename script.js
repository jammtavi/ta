document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false; // Prevent spam clicks

    // Function to open search overlay
    function openSearch() {
        if (isSearchAnimating) return; // Prevent rapid clicks
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden"); // Hide Navbar
        body.classList.add("search-active"); // Prevent Scroll
        searchInput.focus(); // Auto-focus input

        setTimeout(() => { isSearchAnimating = false; }, 300); // Unlock after animation
    }

    // Function to close search overlay
    function closeSearch() {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden"); // Show Navbar
        body.classList.remove("search-active"); // Enable Scroll
        searchInput.value = ""; // Clear input field
        searchInput.blur(); // Remove focus from input
    }

    // Open search overlay when clicking search icon
    searchIcon.addEventListener("click", openSearch);

    // Close search overlay when clicking cancel
    cancelSearch.addEventListener("click", closeSearch);

    // Close search when clicking outside input
    searchOverlay.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) { // Only close if clicking outside the search box
            closeSearch();
        }
    });

    // Close search on ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });
});
