document.addEventListener("DOMContentLoaded", () => {
    // 🔹 Get Elements
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const searchInput = document.getElementById("search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;
    let isSearchAnimating = false;

    // 🔹 Open Search Function
    function openSearch() {
        if (isSearchAnimating) return; // Prevent multiple animations
        isSearchAnimating = true;

        searchOverlay.classList.add("active"); // Show overlay
        topNav.classList.add("hidden"); // Hide nav
        body.classList.add("search-active"); // Prevent scrolling

        setTimeout(() => {
            searchInput.focus(); // Auto-focus input
            isSearchAnimating = false;
        }, 150);
    }

    // 🔹 Close Search Function
    function closeSearch() {
        searchOverlay.classList.remove("active"); // Hide overlay
        topNav.classList.remove("hidden"); // Show nav
        body.classList.remove("search-active"); // Enable scrolling
        searchInput.value = ""; // Clear input
        searchInput.blur(); // Remove focus
    }

    // 🔹 Prevent Animation from Triggering Multiple Times
    searchOverlay.addEventListener("transitionend", () => {
        isSearchAnimating = false;
    });

    // 🔹 Event Listeners
    searchIcon.addEventListener("click", openSearch);
    cancelSearch.addEventListener("click", closeSearch);

    // 🔹 Close Search on Outside Click (Except Input & Cancel)
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

    // 🔹 Mobile Menu Toggle (If Needed in Future)
    const menuIcon = document.getElementById("menu-icon");
    if (menuIcon) {
        menuIcon.addEventListener("click", () => {
            alert("Menu Clicked! (Feature Coming Soon)");
        });
    }
});
