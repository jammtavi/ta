document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    function openSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.add("active");
        topNav.classList.add("hidden");
        body.classList.add("search-active");

        // Accessibility Update
        searchOverlay.setAttribute("aria-hidden", "false");
        searchIcon.setAttribute("aria-expanded", "true");

        // Delay focus slightly for better UX
        setTimeout(() => searchInput.focus(), 150);
    }

    function closeSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");

        searchInput.value = "";
        searchInput.blur();

        // Accessibility Update
        searchOverlay.setAttribute("aria-hidden", "true");
        searchIcon.setAttribute("aria-expanded", "false");
    }

    // Prevent multiple event triggers during animations
    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    // Ensure search closes when clicking outside the search container
    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    // Close search when pressing ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });
});
