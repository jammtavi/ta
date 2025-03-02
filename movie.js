document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("show-download-btn").addEventListener("click", () => {
        document.getElementById("download-section").classList.remove("hidden");
        document.getElementById("show-download-btn").style.display = "none";
    });
});
