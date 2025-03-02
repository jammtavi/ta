document.addEventListener("DOMContentLoaded", () => {
    const movieGrid = document.getElementById("movie-grid");
    const searchInput = document.getElementById("search");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");

    let currentPage = 1;
    const moviesPerPage = 6;
    let movies = [
        { title: "Movie 1", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 2", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 3", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 4", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 5", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 6", poster: "https://via.placeholder.com/200x300", download: "#" },
    ];

    function renderMovies() {
        movieGrid.innerHTML = "";
        let start = (currentPage - 1) * moviesPerPage;
        let end = start + moviesPerPage;
        let filteredMovies = movies.slice(start, end);

        filteredMovies.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="download-btn" onclick="window.location.href='${movie.download}'">Download</button>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    function updatePagination() {
        pageNumber.innerText = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage * moviesPerPage >= movies.length;
    }

    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderMovies();
            updatePagination();
        }
    });

    nextPageBtn.addEventListener("click", () => {
        if (currentPage * moviesPerPage < movies.length) {
            currentPage++;
            renderMovies();
            updatePagination();
        }
    });

    searchInput.addEventListener("input", (e) => {
        let query = e.target.value.toLowerCase();
        movies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        currentPage = 1;
        renderMovies();
        updatePagination();
    });

    renderMovies();
    updatePagination();
});
