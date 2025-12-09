// ===== ADVANCED ANIMATION EFFECTS =====

// Parallax scroll effect
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          entry.target.dataset.animation || "fadeInUp 0.8s ease-out forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation-trigger class
  document.querySelectorAll(".animation-trigger").forEach((el) => {
    observer.observe(el);
  });
}

// Cursor tracking effect
function initCursorTracking() {
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  cursorGlow.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    border: 2px solid var(--accent-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 0 20px var(--accent-color);
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX - 25 + "px";
    cursorGlow.style.top = e.clientY - 25 + "px";
    cursorGlow.style.opacity = "0.5";
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

// Floating particles effect
function initFloatingParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${Math.random() * 5 + 5}s infinite ease-in-out;
      pointer-events: none;
    `;
    hero.appendChild(particle);
  }

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float-particle {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Staggered animations for gallery items
function initStaggeredAnimations() {
  let delay = 0;
  document.querySelectorAll(".gallery-item, .filter-btn").forEach((item) => {
    item.style.animation = `bounceIn 0.6s ease-out ${delay}s both`;
    delay += 0.05;
  });
}

// Text shimmer effect for headings
function initTextShimmer() {
  document.querySelectorAll("h1, h2, .subtitle").forEach((heading) => {
    heading.style.backgroundImage =
      "linear-gradient(90deg, #fff, rgba(255,255,255,0.5), #fff)";
    heading.style.backgroundSize = "200% auto";
    heading.style.WebkitBackgroundClip = "text";
    heading.style.WebkitTextFillColor = "transparent";
    heading.style.backgroundClip = "text";
  });
}

// Gallery filtering and rendering
let currentFilter = "all";

// Render gallery
function renderGallery(filter = "all") {
  const gallery = document.getElementById("galleryGrid");
  if (!gallery) return;

  let items = GALLERY;

  if (filter !== "all") {
    items = GALLERY.filter(
      (item) => item.technique.toLowerCase() === filter.toLowerCase()
    );
  }

  gallery.innerHTML = "";

  items.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "gallery-item";
    itemEl.setAttribute("data-technique", item.technique);
    itemEl.setAttribute("data-id", item.id);
    itemEl.style.animation = `bounceIn 0.6s ease-out ${index * 0.05}s both`;

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

    // Add hover particle effect
    itemEl.addEventListener("mouseenter", (e) => {
      const rect = itemEl.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY);
      }
    });

    gallery.appendChild(itemEl);
  });

  // Fade in animation
  gallery.style.animation = "none";
  setTimeout(() => {
    gallery.style.animation = "fadeIn 0.5s ease-out";
  }, 10);
}

// Create particle effect on click
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 8px;
    height: 8px;
    background: var(--secondary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 999;
    animation: particleFloat 1s ease-out forwards;
  `;
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

// Add particle animation if not exists
if (!document.querySelector("style[data-particles]")) {
  const style = document.createElement("style");
  style.setAttribute("data-particles", "true");
  style.textContent = `
    @keyframes particleFloat {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(${Math.random() * 100 - 50}px, -100px) scale(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Render featured gallery
function renderFeaturedGallery() {
  const featured = document.getElementById("featuredGallery");
  if (!featured) return;

  // Válassz véletlenszerűen, de konzisztensen (az első 6-ot)
  const selectedItems = GALLERY.slice(0, 6);

  featured.innerHTML = "";

  selectedItems.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "featured-item";
    itemEl.setAttribute("data-id", item.id);
    itemEl.style.animation = `scaleInRotate 0.8s ease-out ${index * 0.1}s both`;

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

    // Add 3D tilt effect on mouse move
    itemEl.addEventListener("mousemove", (e) => {
      const rect = itemEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * 20;
      const rotateY = (x / rect.width - 0.5) * 20;

      itemEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    itemEl.addEventListener("mouseleave", () => {
      itemEl.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });

    featured.appendChild(itemEl);
  });
}

// Modal functions
function openModal(item) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");

  modal.style.display = "block";
  modal.style.animation = "fadeIn 0.3s ease-out";

  modalImage.src = `fenykepek/${item.id}.jpg`;
  modalImage.style.animation = "scaleInRotate 0.5s ease-out";

  modalCaption.innerHTML = `
        <strong>${item.title}</strong><br>
        Technika: ${item.technique} | Téma: ${item.category}
        ${
          item.size !== "..." && item.size
            ? `<br>Méret: ${item.size} cm (belső)`
            : ""
        }
    `;
  modalCaption.style.animation = "slideInUp 0.5s ease-out 0.2s both";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.animation = "fadeOut 0.3s ease-out forwards";
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.animation = "";
  }, 300);
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
  console.log(`Total items: ${GALLERY.length}`);

  renderGallery("all");
  renderFeaturedGallery();
  setupFilters();
  setupModalEvents();
  setupSmoothScroll();
  setupLazyLoading();
  optimizeImages();

  // Initialize advanced animations
  initParallaxEffect();
  initCursorTracking();
  initFloatingParticles();
  initStaggeredAnimations();
  initTextShimmer();
  initScrollAnimations();

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
