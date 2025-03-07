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

        setTimeout(() => searchInput.focus(), 150); // Slight delay for better UX
    }

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

    searchOverlay.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !cancelSearch.contains(e.target)) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
            closeSearch();
        }
    });
});
