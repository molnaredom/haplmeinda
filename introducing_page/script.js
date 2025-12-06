// Gallery filtering and rendering
let currentFilter = "all";

// Get gallery items that have actual image files
function getAvailableImages() {
  // Ezek az ID-k vannak a fenykepek mappában
  const availableIds = [
    1, 2, 5, 7, 8, 9, 10, 11, 12, 13, 15, 17, 21, 23, 24, 26, 30, 31, 33, 34,
    38, 40, 41, 42, 45, 55, 57, 58, 61, 62, 63, 64, 65, 70, 71, 72, 73, 74, 75,
    76, 77, 79, 82, 83, 84, 85, 86, 9, 90, 91, 95, 96, 100, 101, 102, 103, 104,
    105, 107, 1002, 1003, 1005, 1033, 1036, 1037,
  ];

  return GALLERY.filter((item) => availableIds.includes(item.id));
}

// Render gallery
function renderGallery(filter = "all") {
  const gallery = document.getElementById("galleryGrid");
  if (!gallery) return;

  const availableItems = getAvailableImages();
  let items = availableItems;

  if (filter !== "all") {
    items = availableItems.filter(
      (item) => item.technique.toLowerCase() === filter.toLowerCase()
    );
  }

  gallery.innerHTML = "";

  items.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "gallery-item";
    itemEl.setAttribute("data-technique", item.technique);
    itemEl.setAttribute("data-id", item.id);

    itemEl.innerHTML = `
            <img src="fenykepek/${item.id}.jpg" 
                 alt="${item.title}" 
                 class="gallery-item-image"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22300%22/%3E%3C/svg%3E'">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${item.title}</div>
                <div class="gallery-item-technique">${item.technique}</div>
                <span class="gallery-item-category">${item.category}</span>
                ${
                  item.sold
                    ? '<span style="color: #e74c3c; font-weight: bold; margin-left: 0.5rem;">ELADVA</span>'
                    : ""
                }
            </div>
        `;

    itemEl.addEventListener("click", () => openModal(item));
    gallery.appendChild(itemEl);
  });

  // Fade in animation
  gallery.style.animation = "none";
  setTimeout(() => {
    gallery.style.animation = "fadeIn 0.5s ease-out";
  }, 10);
}

// Render featured gallery
function renderFeaturedGallery() {
  const featured = document.getElementById("featuredGallery");
  if (!featured) return;

  const availableItems = getAvailableImages();
  // Válassz véletlenszerűen, de konzisztensen (seed-alapú)
  const selectedItems = availableItems
    .slice()
    .sort((a, b) => a.id - b.id)
    .slice(0, 6);

  featured.innerHTML = "";

  selectedItems.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "featured-item";
    itemEl.setAttribute("data-id", item.id);

    itemEl.innerHTML = `
            <img src="fenykepek/${item.id}.jpg" 
                 alt="${item.title}"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22300%22/%3E%3C/svg%3E'">
            <div class="featured-overlay">
                <div class="featured-title">${item.title}</div>
                <div class="featured-technique">${item.technique} • ${item.category}</div>
            </div>
        `;

    itemEl.addEventListener("click", () => openModal(item));
    featured.appendChild(itemEl);
  });
}

// Modal functions
function openModal(item) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  modal.style.display = "block";
  modalImage.src = `fenykepek/${item.id}.jpg`;
  modalCaption.innerHTML = `
        <strong>${item.title}</strong><br>
        Technika: ${item.technique} | Téma: ${item.category}
        ${
          item.size !== "..." && item.size
            ? `<br>Méret: ${item.size} cm (belső)`
            : ""
        }
    `;
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}

// Filter functionality
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      currentFilter = filter;
      renderGallery(filter);
    });
  });
}

// Modal close events
function setupModalEvents() {
  const modal = document.getElementById("imageModal");
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Keyboard close
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Intersection Observer for lazy loading
function setupLazyLoading() {
  if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Already loaded via native lazy loading, just mark as loaded
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Image optimization - serve optimized images
function optimizeImages() {
  // Check if we can use webp
  const canvas = document.createElement("canvas");
  const supportsWebP =
    canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;

  if (!supportsWebP) {
    // Fallback for older browsers - already using jpg
  }
}

// Initialize on DOM ready
function init() {
  console.log("Initializing gallery...");
  console.log(`Available items: ${getAvailableImages().length}`);

  renderGallery("all");
  renderFeaturedGallery();
  setupFilters();
  setupModalEvents();
  setupSmoothScroll();
  setupLazyLoading();
  optimizeImages();

  console.log("Gallery initialized!");
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Add hash navigation support
window.addEventListener("hashchange", function () {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
});
