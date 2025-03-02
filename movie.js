document.addEventListener("DOMContentLoaded", () => {
    const showDownloadBtn = document.getElementById("show-download-btn");
    const downloadSection = document.getElementById("download-section");

    showDownloadBtn.addEventListener("click", () => {
        downloadSection.classList.add("show"); // Smooth transition effect
        downloadSection.classList.remove("hidden"); // Reveal download button
        showDownloadBtn.style.display = "none"; // Hide the "Show Download" button
    });
});
