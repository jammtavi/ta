document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const cancelSearch = document.getElementById("cancel-search");
  const searchInput = document.getElementById("search");
  const movieGrid = document.getElementById("movie-grid");
  const body = document.body;
  const profileIcon = document.getElementById("profile-icon");
  const profileMenu = document.getElementById("profile-menu");
  const recentSearchesContainer = document.getElementById("recent-searches");

  // Initialize movies
  function fetchAndStoreMovies() {
    const existing = localStorage.getItem("movies");
    if (existing) return JSON.parse(existing);

    const movies = [
      { id: "movie1", title: "Brazzers Movie 1", description: "Adult film 1", poster: "images/poster1.jpg", downloadLink: "https://example.com/1" },
      { id: "movie2", title: "Brazzers Movie 2", description: "Adult film 2", poster: "images/poster2.jpg", downloadLink: "https://example.com/2" },
      { id: "movie3", title: "BangBros Movie", description: "Hot release", poster: "images/poster3.jpg", downloadLink: "https://example.com/3" }
    ];
    localStorage.setItem("movies", JSON.stringify(movies));
    return movies;
  }

  const storedMovies = fetchAndStoreMovies();

  // Render movies
  function renderMovies(list) {
    if (!movieGrid) return;
    movieGrid.innerHTML = "";

    if (!list.length) {
      movieGrid.innerHTML = `<p class="loading-text">No movies found.</p>`;
      return;
    }

    list.forEach(movie => {
      const card = document.createElement("article");
      card.classList.add("movie-card");
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
        <h3>${movie.title}</h3>
      `;
      card.addEventListener("click", () => openMovieDetails(movie.id));
      movieGrid.appendChild(card);
    });
  }

  // Normalize string for search
  function normalize(str) {
    return str.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
  }

  // Search logic
  function searchMovies() {
    const query = searchInput.value.trim();
    if (!query) {
      renderMovies(storedMovies);
      return;
    }

    const filtered = storedMovies.filter(movie =>
      normalize(movie.title).includes(normalize(query))
    );
    renderMovies(filtered);
  }

  // Save recent search only when pressing Enter
  function saveRecentSearch(term) {
    if (!term) return;
    let history = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    history = history.filter(t => t.toLowerCase() !== term.toLowerCase());
    history.unshift(term);
    if (history.length > 10) history = history.slice(0, 10);
    localStorage.setItem("recentSearches", JSON.stringify(history));
    renderRecentSearches();
  }

  // Render recent searches
  function renderRecentSearches() {
    if (!recentSearchesContainer) return;
    const history = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    recentSearchesContainer.innerHTML = "";

    history.forEach(term => {
      const item = document.createElement("div");
      item.className = "recent-item";
      item.innerHTML = `
        <span class="term">${term}</span>
        <span class="remove" title="Remove">×</span>
      `;

      item.querySelector(".term").addEventListener("click", () => {
        searchInput.value = term;
        searchMovies();
        closeSearch(false);
      });

      item.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        const updated = history.filter(t => t !== term);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
        renderRecentSearches();
      });

      recentSearchesContainer.appendChild(item);
    });
  }

  // Debounce search
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => requestAnimationFrame(() => func.apply(this, args)), delay);
    };
  }

  const debouncedSearch = debounce(searchMovies, 300);

  // Open and close search overlay
  function openSearch() {
    searchOverlay.classList.add("active");
    body.classList.add("search-active");
    searchOverlay.setAttribute("aria-hidden", "false");
    searchInput.focus();
    renderRecentSearches();
  }

  function closeSearch(clear = true) {
    searchOverlay.classList.remove("active");
    body.classList.remove("search-active");
    searchOverlay.setAttribute("aria-hidden", "true");
    if (clear) searchInput.value = "";
  }

  // Keyboard ESC support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearch();
    }
  });

  // Click outside search
  document.addEventListener("click", (e) => {
    if (searchOverlay.classList.contains("active") &&
        !e.target.closest(".search-container") &&
        !e.target.closest("#search-icon")) {
      closeSearch();
    }
  });

  // Open movie details page
  window.openMovieDetails = function (id) {
    window.location.href = `movie.html?id=${id}`;
  };

  // Load movie details page
  if (window.location.pathname.includes("movie.html")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const movie = storedMovies.find(m => m.id === id);
    if (movie) setMovieDetails(movie);
    else handleMovieNotFound();
  }

  function setMovieDetails(movie) {
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-description").textContent = movie.description;
    document.getElementById("movie-poster").src = movie.poster;
    document.getElementById("download-button").href = movie.downloadLink;
    document.title = `${movie.title} - Movie Details`;
  }

  function handleMovieNotFound() {
    const error = document.getElementById("error-message");
    if (error) error.style.display = "block";
    setTimeout(() => window.location.href = "index.html", 2000);
  }

  // Profile dropdown
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

  // Events
  searchIcon?.addEventListener("click", openSearch);
  cancelSearch?.addEventListener("click", () => closeSearch());
  searchInput?.addEventListener("input", debouncedSearch);

  // Pressing Enter will perform search and save it in history
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchMovies();
      saveRecentSearch(searchInput.value.trim());
      closeSearch(false); // keep results
    }
  });

  if (movieGrid && !window.location.pathname.includes("movie.html")) {
    renderMovies(storedMovies);
  }
});
