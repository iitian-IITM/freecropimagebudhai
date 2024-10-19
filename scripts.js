// Get elements
const uploadArea = document.getElementById("uploadArea");
const imageUpload = document.getElementById("imageUpload");
const cropSection = document.getElementById("cropSection");
const cropArea = document.getElementById("cropArea");
const imageElement = document.getElementById("image");
const cropButton = document.getElementById("cropButton");
const downloadButton = document.getElementById("downloadButton");
const uploadAnotherButton = document.getElementById("uploadAnotherButton");
const resultCanvas = document.getElementById("resultCanvas");

let cropper;

// Open file dialog when clicking on the upload area
uploadArea.addEventListener("click", () => {
    imageUpload.click();
});

// Handle image upload
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageElement.src = e.target.result;
            imageElement.style.display = "block"; // Show the image
            cropSection.style.display = "block"; // Show the crop section

            // Initialize Cropper.js
            if (cropper) {
                cropper.destroy(); // Destroy previous cropper instance if it exists
            }
            cropper = new Cropper(imageElement, {
                aspectRatio: NaN, // Allow free cropping
                viewMode: 1, // Restrict cropping to the container
                autoCropArea: 1,
                responsive: true, // Enable responsiveness
                dragMode: 'move', // Allow moving the image
                zoomable: true, // Allow zooming the image
                rotatable: false, // Disable rotation
                scalable: false, // Disable scaling
                crop(event) {
                    // Optional: You can use this to get crop data
                    console.log(event.detail);
                },
            });
        };
        reader.readAsDataURL(file);
    }
});

// Crop image and show download button
cropButton.addEventListener("click", () => {
    // Get the cropped canvas based on the cropper settings
    const canvas = cropper.getCroppedCanvas({
        width: 750,
        height: 450,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    });

    // Clear the previous canvas dimensions
    resultCanvas.width = canvas.width;  // Set canvas to cropped image width
    resultCanvas.height = canvas.height; // Set canvas to cropped image height

    // Draw the cropped image onto the canvas
    const ctx = resultCanvas.getContext("2d");
    ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height); // Clear previous content
    ctx.drawImage(canvas, 0, 0);

    // Create download link
    const croppedImageUrl = resultCanvas.toDataURL("image/png");
    downloadButton.href = croppedImageUrl;
    downloadButton.download = "cropped-image.png"; // Default download file name
    downloadButton.style.display = "block"; // Show download button
});

// Allow uploading another image
uploadAnotherButton.addEventListener("click", () => {
    cropSection.style.display = "none"; // Hide crop section
    imageUpload.value = ""; // Reset file input
    if (cropper) {
        cropper.destroy(); // Destroy the cropper instance
    }
    imageElement.style.display = "none"; // Hide the image
    downloadButton.style.display = "none"; // Hide download button
});
// Get the toggle element
const toggleTheme = document.getElementById("toggleTheme");

// Add event listener for toggle change
toggleTheme.addEventListener("change", () => {
    document.body.classList.toggle("night-mode");

    // Change the icon based on the theme
    if (toggleTheme.checked) {
        toggleTheme.previousElementSibling.textContent = "🌞"; // Change to sun icon
    } else {
        toggleTheme.previousElementSibling.textContent = "🌙"; // Change to moon icon
    }
});

// Optional: Set the initial state based on saved preference
if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-mode");
    toggleTheme.checked = true;
}

// Save theme preference in local storage
toggleTheme.addEventListener("change", () => {
    if (toggleTheme.checked) {
        localStorage.setItem("theme", "night");
    } else {
        localStorage.setItem("theme", "day");
    }
});
// Theme toggle functionality
toggleTheme.addEventListener("change", () => {
    document.body.classList.toggle("light"); // Toggle light class
});
// Prevent default drag behaviors
document.addEventListener("dragover", (event) => {
    event.preventDefault();
});
document.addEventListener("drop", (event) => {
    event.preventDefault();
});
