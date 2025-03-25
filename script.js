document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const cancelSearch = document.getElementById("cancel-search");
  const searchInput = document.getElementById("search");
  const movieGrid = document.getElementById("movie-grid");
  const body = document.body;
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");

  // 🔹 Fetch or Initialize Movies
  function fetchAndStoreMovies() {
    const existingMovies = localStorage.getItem("movies");
    if (existingMovies) return JSON.parse(existingMovies);

    const movies = [
      {
        id: "movie1",
        title: "Brazzers Hot Night",
        description: "An intense adult film production.",
        poster: "images/brazzers1.jpg",
        downloadLink: "https://example.com/download/movie1"
      },
      {
        id: "movie2",
        title: "Bang Bros Adventure",
        description: "Ride along with the wildest.",
        poster: "images/bangbros.jpg",
        downloadLink: "https://example.com/download/movie2"
      },
      {
        id: "movie3",
        title: "Brazzers College Fun",
        description: "Steamy party at college dorm.",
        poster: "images/brazzers2.jpg",
        downloadLink: "https://example.com/download/movie3"
      }
    ];

    localStorage.setItem("movies", JSON.stringify(movies));
    return movies;
  }

  const storedMovies = fetchAndStoreMovies();

  // 🔹 Open & Close Search Overlay
  function openSearch() {
    if (!searchOverlay || !searchInput) return;
    searchOverlay.classList.add("active");
    body.classList.add("search-active");
    searchOverlay.setAttribute("aria-hidden", "false");
    setTimeout(() => searchInput.focus(), 150);
    history.pushState({ searchOpen: true }, "");
  }

  function closeSearch(reset = true) {
    searchOverlay.classList.remove("active");
    body.classList.remove("search-active");
    searchOverlay.setAttribute("aria-hidden", "true");

    if (reset) {
      searchInput.value = "";
      renderMovies(storedMovies);
    }

    if (window.history.state?.searchOpen) {
      history.back();
    }
  }

  // 🔹 Search Logic
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => requestAnimationFrame(() => func.apply(this, args)), delay);
    };
  }

  function normalizeString(str) {
    return str.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
  }

  function searchMovies() {
    const query = normalizeString(searchInput.value.trim());
    if (!query) {
      renderMovies(storedMovies);
      return;
    }

    const filtered = storedMovies.filter(movie =>
      normalizeString(movie.title).includes(query)
    );
    renderMovies(filtered);
  }

  const debouncedSearch = debounce(searchMovies, 250);

  // 🔹 Render Movie Cards
  function renderMovies(movieList) {
    if (!movieGrid) return;
    movieGrid.innerHTML = "";

    if (movieList.length === 0) {
      movieGrid.innerHTML = `<p class="loading-text">No movies found.</p>`;
      return;
    }

    movieList.forEach(movie => {
      const card = document.createElement("article");
      card.classList.add("movie-card");
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster" loading="lazy" class="lazy-load">
        <h3>${movie.title}</h3>
      `;
      card.addEventListener("click", () => openMovieDetails(movie.id));
      movieGrid.appendChild(card);
    });

    document.querySelectorAll(".lazy-load").forEach(img => {
      img.onload = () => img.classList.add("loaded");
    });
  }

  // 🔹 Profile Dropdown
  let dropdownActive = false;
  profileIcon?.addEventListener("click", (e) => {
    dropdownActive = !dropdownActive;
    profileMenu.classList.toggle("active", dropdownActive);
    profileMenu.setAttribute("aria-hidden", !dropdownActive);
    profileMenu.setAttribute("aria-expanded", dropdownActive);
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!profileIcon?.contains(e.target) && !profileMenu?.contains(e.target)) {
      profileMenu?.classList.remove("active");
      profileMenu?.setAttribute("aria-hidden", "true");
      profileMenu?.setAttribute("aria-expanded", "false");
      dropdownActive = false;
    }
  });

  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (Math.abs(window.scrollY - lastScrollY) > 30) {
      profileMenu?.classList.remove("active");
      profileMenu?.setAttribute("aria-hidden", "true");
      profileMenu?.setAttribute("aria-expanded", "false");
      dropdownActive = false;
    }
    lastScrollY = window.scrollY;
  });

  profileMenu?.addEventListener("transitionend", () => {
    profileMenu.style.visibility = profileMenu.classList.contains("active") ? "visible" : "hidden";
  });

  // 🔹 Search Events
  searchIcon?.addEventListener("click", openSearch);
  cancelSearch?.addEventListener("click", () => closeSearch(true));
  searchInput?.addEventListener("input", debouncedSearch);

  // ENTER key → search + close without reset
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchMovies();
      closeSearch(false); // don't reset results
    }
  });

  // ESC key → close with reset
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearch(true);
    }
  });

  // Click outside → close with reset
  searchOverlay?.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      closeSearch(true);
    }
  });

  // Back button → close
  window.addEventListener("popstate", (e) => {
    if (e.state?.searchOpen && searchOverlay.classList.contains("active")) {
      closeSearch(true);
    }
  });

  // Initial movie load
  if (movieGrid && !window.location.pathname.includes("movie.html")) {
    renderMovies(storedMovies);
  }
});

// 🔹 Global Function
window.openMovieDetails = function (movieId) {
  window.location.href = `movie.html?id=${movieId}`;
};
