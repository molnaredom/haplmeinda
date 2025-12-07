// Gallery filtering and rendering
let currentFilter = "all";
let availableIds = [];

// Get gallery items that have actual image files
async function getAvailableImages() {
  // Ha még nincs betöltve, betöltjük az available-images.json-t
  if (availableIds.length === 0) {
    try {
      const response = await fetch("available-images.json");
      const data = await response.json();
      availableIds = data.availableIds;
      console.log(`Loaded ${availableIds.length} available images`);
    } catch (error) {
      console.error("Error loading available images list:", error);
      // Fallback: üres lista, nem lesz megjelenítve egyetlen kép sem
      availableIds = [];
    }
  }

  return GALLERY.filter((item) => availableIds.includes(item.id));
}

// Render gallery
async function renderGallery(filter = "all") {
  const gallery = document.getElementById("galleryGrid");
  if (!gallery) return;

  const availableItems = await getAvailableImages();
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
async function renderFeaturedGallery() {
  const featured = document.getElementById("featuredGallery");
  if (!featured) return;

  const availableItems = await getAvailableImages();
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
    btn.addEventListener("click", async function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      currentFilter = filter;
      await renderGallery(filter);
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
async function init() {
  console.log("Initializing gallery...");
  const images = await getAvailableImages();
  console.log(`Available items: ${images.length}`);

  await renderGallery("all");
  await renderFeaturedGallery();
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
