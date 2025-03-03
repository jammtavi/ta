document.addEventListener("DOMContentLoaded", () => {
    const movie = JSON.parse(localStorage.getItem("selectedMovie"));

    if (movie) {
        document.getElementById("movie-thumbnail").src = movie.thumbnail;
        document.getElementById("movie-title").innerText = movie.title;
        document.getElementById("movie-description").innerText = movie.description;
        
        document.getElementById("download-button").style.display = "block";
    } else {
        document.body.innerHTML = "<h2>Movie not found. Please go back.</h2>";
    }
});

// Go Back Function
function goBack() {
    window.history.back();
}
