// 1. Select the cuisine <span> elements
const cuisineElements = document.querySelectorAll('.cuisine');

// 2. Select top-row images and bottom-row images separately
const dishImagesTop = document.querySelectorAll('.dish-row.top img');
const dishImagesBottom = document.querySelectorAll('.dish-row.bottom img');

// 3. Functions to show or reset images

/**
 * Show the top and bottom images from the data attributes.
 * @param {string} topImagesStr    - comma-separated list of top-row image paths
 * @param {string} bottomImagesStr - comma-separated list of bottom-row image paths
 */
function showCuisineImages(topImagesStr, bottomImagesStr) {
  // Split each string into arrays
  const topImagesArray = topImagesStr ? topImagesStr.split(',') : [];
  const bottomImagesArray = bottomImagesStr ? bottomImagesStr.split(',') : [];

  // Update top row
  dishImagesTop.forEach((img, index) => {
    // If fewer images than slots, cycle using modulo
    if (topImagesArray.length > 0) {
      const path = topImagesArray[index % topImagesArray.length].trim();
      img.src = path;
      img.alt = extractBaseName(path);
    }
  });

  // Update bottom row
  dishImagesBottom.forEach((img, index) => {
    // Similarly, cycle if needed
    if (bottomImagesArray.length > 0) {
      const path = bottomImagesArray[index % bottomImagesArray.length].trim();
      img.src = path;
      img.alt = extractBaseName(path);
    }
  });
}

/**
 * Reset images to the original (the "3-X" series).
 */
function resetImages() {
  [...dishImagesTop, ...dishImagesBottom].forEach((img, index) => {
    // We have a total of top + bottom images. 
    // If we have 6 top and 6 bottom, total = 12 => index + 1 goes from 1..12
    img.src = `img/3-${index + 1}.png`;
    img.alt = `Dish ${index + 1}`;
  });
}

/**
 * Extracts the file name without extension from the path, for alt text.
 */
function extractBaseName(path) {
  const fileName = path.substring(path.lastIndexOf('/') + 1);  // e.g. "french_top1.png"
  return fileName.substring(0, fileName.lastIndexOf('.')) || fileName; // e.g. "french_top1"
}

// 4. Attach hover events
cuisineElements.forEach((cuisineEl) => {
  cuisineEl.addEventListener('mouseover', () => {
    // Get data attributes for top and bottom
    const topImages = cuisineEl.getAttribute('data-top-images') || '';
    const bottomImages = cuisineEl.getAttribute('data-bottom-images') || '';
    showCuisineImages(topImages, bottomImages);
  });

  // OPTIONAL: revert to default on mouseout
  cuisineEl.addEventListener('mouseout', resetImages);
});
