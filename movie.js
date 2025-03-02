document.addEventListener("DOMContentLoaded", () => {
    const showDownloadBtn = document.getElementById("show-download-btn");
    const downloadSection = document.getElementById("download-section");

    showDownloadBtn.addEventListener("click", () => {
        downloadSection.classList.add("show"); 
        downloadSection.classList.remove("hidden"); 
        showDownloadBtn.style.display = "none"; 
    });
});
