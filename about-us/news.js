// News Page - Sidebar Navigation
document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".news-sidebar__item");
  const newsDetails = document.querySelectorAll(".news-detail");
  const sidebarNav = document.querySelector(".news-sidebar__nav");

  // Function to switch news
  function switchNews(index) {
    // Remove active class from all sidebar items
    sidebarItems.forEach((item) => {
      item.classList.remove("news-sidebar__item--active");
    });

    // Remove active class from all news details
    newsDetails.forEach((detail) => {
      detail.classList.remove("news-detail--active");
    });

    // Add active class to clicked item
    sidebarItems[index].classList.add("news-sidebar__item--active");

    // Show corresponding news detail
    newsDetails[index].classList.add("news-detail--active");

    // Scroll active item into view in horizontal scroll on mobile/tablet
    if (window.innerWidth <= 1000) {
      const activeItem = sidebarItems[index];
      if (activeItem && sidebarNav) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    // Scroll to top of content on mobile
    if (window.innerWidth <= 768) {
      const newsContent = document.querySelector(".news-content");
      if (newsContent) {
        newsContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // Add click event to each sidebar item
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      switchNews(index);
    });
  });

  // Optional: Add keyboard navigation
  sidebarItems.forEach((item, index) => {
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchNews(index);
      }
    });
  });
});
