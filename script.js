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
        searchIcon.setAttribute("aria-expanded", "true");
        searchOverlay.setAttribute("aria-hidden", "false");

        // Delay focus for a smooth effect
        setTimeout(() => {
            searchInput.focus();
            isSearchAnimating = false;
        }, 300);
    }

    function closeSearch() {
        if (isSearchAnimating) return;
        isSearchAnimating = true;

        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden");
        body.classList.remove("search-active");
        searchIcon.setAttribute("aria-expanded", "false");
        searchOverlay.setAttribute("aria-hidden", "true");

        // Clear input and remove focus
        searchInput.value = "";
        searchInput.blur();

        // Ensure animation flag resets after transition
        setTimeout(() => {
            isSearchAnimating = false;
        }, 400);
    }

    // 🔹 Open search when clicking the search icon
    searchIcon.addEventListener("click", openSearch);

    // 🔹 Close search when clicking the cancel button
    cancelSearch.addEventListener("click", closeSearch);

    // 🔹 Close search when clicking outside the search input
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // 🔹 Close search on pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });

    // 🔹 Handle focus glow effect (Optional Enhancement)
    searchInput.addEventListener("focus", () => {
        searchInput.style.outline = "2px solid #ff4d4d";
    });

    searchInput.addEventListener("blur", () => {
        searchInput.style.outline = "none";
    });
});
