document.addEventListener("DOMContentLoaded", () => {
    const movieGrid = document.getElementById("movie-grid");

    let movies = [
        { title: "Movie 1", poster: "https://via.placeholder.com/200x300", download: "#" },
        { title: "Movie 2", poster: "https://via.placeholder.com/200x300", download: "#" }
    ];

    function renderMovies() {
        movieGrid.innerHTML = "";
        movies.forEach(movie => {
            let movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <a href="movie.html" class="details-btn">View Details</a>
            `;
            movieGrid.appendChild(movieCard);
        });
    }

    renderMovies();
});
