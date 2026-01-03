document.addEventListener("DOMContentLoaded", () => {
  // Set header height for mobile nav positioning
  const header = document.querySelector(".header");
  if (header) {
    const setHeaderHeight = () => {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
      );
    };
    setHeaderHeight();
    window.addEventListener("resize", setHeaderHeight);
  }

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

  // Mobile Submenu Toggle
  const submenuItems = document.querySelectorAll(".nav__item--has-submenu");
  submenuItems.forEach((item) => {
    const link = item.querySelector(".nav__link");
    link.addEventListener("click", (e) => {
      // Only prevent default and toggle on mobile
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    });
  });

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

  /* =========================================================================
     Services Tabs Switching
     ========================================================================= */
  const tabButtons = document.querySelectorAll(".services-tabs__btn");
  const tabContents = document.querySelectorAll(".services-tabs__content");

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");

        // Remove active class from all buttons
        tabButtons.forEach((btn) => {
          btn.classList.remove("services-tabs__btn--active");
        });

        // Add active class to clicked button
        button.classList.add("services-tabs__btn--active");

        // Hide all content
        tabContents.forEach((content) => {
          content.classList.remove("services-tabs__content--active");
        });

        // Show target content
        const targetContent = document.querySelector(
          `.services-tabs__content[data-content="${targetTab}"]`
        );
        if (targetContent) {
          targetContent.classList.add("services-tabs__content--active");
        }
      });
    });

    // Keyboard navigation for tabs
    document.addEventListener("keydown", (e) => {
      // Use arrow keys to switch tabs
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const activeButton = document.querySelector(
          ".services-tabs__btn--active"
        );
        if (!activeButton) return;

        const buttons = Array.from(tabButtons);
        const currentIndex = buttons.indexOf(activeButton);

        let newIndex;
        if (e.key === "ArrowRight") {
          newIndex = (currentIndex + 1) % buttons.length;
        } else {
          newIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }

        buttons[newIndex].click();
      }
    });
  }

  /* =========================================================================
     Template Gallery
     ========================================================================= */
  const templateImages = document.querySelectorAll(".template-gallery__image");
  const prevArrow = document.querySelector(".template-gallery__arrow--left");
  const nextArrow = document.querySelector(".template-gallery__arrow--right");
  const indicators = document.querySelectorAll(".template-gallery__indicator");
  const galleryContainer = document.querySelector(
    ".template-gallery__container"
  );

  let currentTemplateIndex = 0;

  function showTemplate(index) {
    // Remove active class from all images and indicators
    templateImages.forEach((img) => img.classList.remove("active"));
    indicators.forEach((ind) => ind.classList.remove("active"));

    // Add active class to current image and indicator
    if (templateImages[index]) {
      templateImages[index].classList.add("active");
    }
    if (indicators[index]) {
      indicators[index].classList.add("active");
    }

    currentTemplateIndex = index;
  }

  function nextTemplate() {
    const nextIndex = (currentTemplateIndex + 1) % templateImages.length;
    showTemplate(nextIndex);
  }

  function prevTemplate() {
    const nextIndex =
      (currentTemplateIndex - 1 + templateImages.length) %
      templateImages.length;
    showTemplate(nextIndex);
  }

  // Arrow button events
  if (nextArrow) {
    nextArrow.addEventListener("click", nextTemplate);
  }

  if (prevArrow) {
    prevArrow.addEventListener("click", prevTemplate);
  }

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showTemplate(index);
    });
  });

  // Keyboard navigation for template gallery
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      if (prevArrow) prevTemplate();
    } else if (e.key === "ArrowRight") {
      if (nextArrow) nextTemplate();
    }
  });

  // Click to enlarge
  if (galleryContainer) {
    galleryContainer.addEventListener("click", () => {
      const activeImage = document.querySelector(
        ".template-gallery__image.active"
      );
      if (activeImage) {
        openModal(activeImage.src, activeImage.alt);
      }
    });
  }

  // Modal functionality
  function openModal(src, alt) {
    // Create modal if it doesn't exist
    let modal = document.querySelector(".template-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "template-modal";
      modal.innerHTML = `
        <button class="template-modal__close" aria-label="關閉">&times;</button>
        <img class="template-modal__content" src="" alt="">
      `;
      document.body.appendChild(modal);

      // Close modal on click
      const closeBtn = modal.querySelector(".template-modal__close");
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });

      // Close modal on background click
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });

      // Close modal on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          modal.classList.remove("active");
        }
      });
    }

    // Set image and show modal
    const modalImg = modal.querySelector(".template-modal__content");
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("active");
  }
});
