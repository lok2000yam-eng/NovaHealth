/* ==================== Demo News JS ==================== */

// Since we're using separate pages with links instead of internal switching,
// the JavaScript is minimal - mainly for any interactive enhancements

document.addEventListener("DOMContentLoaded", function () {
  // Scroll the active nav item into view on mobile
  scrollActiveNavIntoView();

  // Add smooth scroll behavior for any anchor links
  initSmoothScroll();
});

/**
 * Scroll the active navigation item into view on mobile (horizontal scroll)
 */
function scrollActiveNavIntoView() {
  const activeItem = document.querySelector(".news-nav__item--active");
  const navList = document.querySelector(".news-nav__list");

  if (activeItem && navList) {
    // Wait for layout to complete
    requestAnimationFrame(() => {
      const navListRect = navList.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();

      // Calculate scroll position to center the active item
      const scrollLeft =
        activeItem.offsetLeft -
        navList.offsetLeft -
        navListRect.width / 2 +
        activeRect.width / 2;

      navList.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Optional: Add loading state for navigation links
 */
function addNavigationLoadingState() {
  const navItems = document.querySelectorAll(".news-nav__item");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Don't add loading state if it's the active item
      if (this.classList.contains("news-nav__item--active")) {
        e.preventDefault();
        return;
      }

      // Add a subtle loading indication
      this.style.opacity = "0.7";
      this.style.pointerEvents = "none";
    });
  });
}

// Initialize loading state handler
addNavigationLoadingState();
