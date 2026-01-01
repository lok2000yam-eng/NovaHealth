document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector("#nav-menu");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      // Toggle the 'active' class on the nav element
      nav.classList.toggle("active");

      // Change icon from Bars to Times (X)
      const icon = menuBtn.querySelector("i");
      if (icon) {
        if (nav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }

      // Close mobile menu if open when a link is clicked
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");

        // Reset icon
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  /* FAQ Accordion */
  const faqQuestions = document.querySelectorAll(".faq__question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq__item").forEach((item) => {
        item.classList.remove("active");
        item
          .querySelector(".faq__question")
          .setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Testimonials Infinite Loop Logic */
  const track = document.querySelector(".testimonial-track");
  if (track) {
    // Clone all children (cards) and append them to the end
    // This creates the [Set A][Set A] structure needed for infinite scrolling
    const cards = Array.from(track.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      // Ensure aria-hidden is true for clones to avoid screen reader duplication
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* =========================================================================
     Latest News Slider
     ========================================================================= */
  const newsTrack = document.querySelector(".latest-news__track");
  const prevBtn = document.querySelector(".latest-news__btn--prev");
  const nextBtn = document.querySelector(".latest-news__btn--next");

  if (newsTrack && prevBtn && nextBtn) {
    const newsCards = newsTrack.querySelectorAll(".news-card");
    const totalCards = newsCards.length;
    let currentIndex = 0;

    // Function to check screen size
    const isMobile = () => window.innerWidth <= 900;

    // Calculate max index based on screen size
    const getMaxIndex = () => {
      return isMobile() ? totalCards - 1 : 1; // Mobile: show 1 at a time, Desktop: show 2 at a time
    };

    const updateSlider = () => {
      // Calculate transform based on current index
      const cardWidth = 100; // Each card is 50% width on desktop, 100% on mobile
      const gap = isMobile() ? 0 : 2.4; // Gap percentage
      const moveAmount = isMobile()
        ? currentIndex * 100
        : currentIndex * (50 + gap);

      newsTrack.style.transform = `translateX(-${moveAmount}%)`;

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= getMaxIndex();
    };

    nextBtn.addEventListener("click", () => {
      if (currentIndex < getMaxIndex()) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    // Reset on window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Reset to first slide on resize to avoid display issues
        if (currentIndex > getMaxIndex()) {
          currentIndex = getMaxIndex();
        }
        updateSlider();
      }, 250);
    });

    // Initialize
    updateSlider();
  }
});
