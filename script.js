document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchOverlay = document.getElementById("search-overlay");
    const cancelSearch = document.getElementById("cancel-search");
    const topNav = document.querySelector(".top-nav");
    const body = document.body;

    // Open search overlay when clicking search icon
    searchIcon.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        topNav.classList.add("hidden"); // Hide Navbar
        body.classList.add("search-active"); // Prevent Scroll
    });

    // Close search overlay when clicking cancel
    cancelSearch.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        topNav.classList.remove("hidden"); // Show Navbar
        body.classList.remove("search-active"); // Enable Scroll
    });

    // Close search when clicking outside input
    searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove("active");
            topNav.classList.remove("hidden");
            body.classList.remove("search-active");
        }
    });

    // Prevent pinch-to-zoom (double-hand zooming)
    document.addEventListener("gesturestart", (e) => {
        e.preventDefault();
    });

    document.addEventListener("touchmove", (e) => {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Ensure all nav elements fit within screen width
    function adjustNavLayout() {
        const navWidth = topNav.offsetWidth;
        const logoWidth = document.querySelector(".logo").offsetWidth;
        const iconsWidth = document.querySelector(".nav-icons").offsetWidth;
        const menuWidth = document.getElementById("menu-icon").offsetWidth;

        if (menuWidth + logoWidth + iconsWidth > navWidth) {
            document.querySelector(".logo").style.fontSize = "16px";
        }
    }

    window.addEventListener("resize", adjustNavLayout);
    adjustNavLayout(); // Run on load
});
