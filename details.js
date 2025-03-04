document.addEventListener("DOMContentLoaded", () => {
    const detailsContent = document.getElementById("details-content");
    const goBack = document.getElementById("go-back");

    // 🔹 Sample Movie Data (Replace with API if needed)
    const movies = {
        "Movie One": {
            image: "https://via.placeholder.com/300x450",
            description: "A thrilling action movie with unexpected twists.",
            downloadLink: "#"
        },
        "Movie Two": {
            image: "https://via.placeholder.com/300x450",
            description: "A horror movie that will keep you on edge!",
            downloadLink: "#"
        },
        "Movie Three": {
            image: "https://via.placeholder.com/300x450",
            description: "A sci-fi adventure beyond imagination.",
            downloadLink: "#"
        }
    };

    // 🔹 Get Movie Title from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get("title");

    // 🔹 Load Movie Details
    if (movies[movieTitle]) {
        const movie = movies[movieTitle];
        detailsContent.innerHTML = `
            <img src="${movie.image}" alt="${movieTitle}">
            <h2>${movieTitle}</h2>
            <p>${movie.description}</p>
            <a href="${movie.downloadLink}" class="download-btn">Download</a>
        `;
    } else {
        detailsContent.innerHTML = "<p>Movie not found.</p>";
    }

    // 🔹 Back Button
    goBack.addEventListener("click", () => {
        window.history.back();
    });
});
