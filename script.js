// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  if (mobileMenu.classList.contains('open')) {
    mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
  } else {
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
  }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible');
    backToTopButton.classList.remove('opacity-100', 'visible');
  }
});

// Initialize Testimonials Swiper
const testimonialSwiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Gallery Filter
const filterAll = document.getElementById('filter-all');
const filterCompleted = document.getElementById('filter-completed');
const filterProcess = document.getElementById('filter-process');
const galleryItems = document.querySelectorAll('.gallery-item');

filterAll.addEventListener('click', () => {
  resetFilterButtons();
  filterAll.classList.remove('bg-white', 'text-pool-dark');
  filterAll.classList.add('bg-pool-blue', 'text-white');

  galleryItems.forEach(item => {
    item.style.display = 'block';
  });
});

filterCompleted.addEventListener('click', () => {
  resetFilterButtons();
  filterCompleted.classList.remove('bg-white', 'text-pool-dark');
  filterCompleted.classList.add('bg-pool-blue', 'text-white');

  galleryItems.forEach(item => {
    if (item.dataset.category === 'completed') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

filterProcess.addEventListener('click', () => {
  resetFilterButtons();
  filterProcess.classList.remove('bg-white', 'text-pool-dark');
  filterProcess.classList.add('bg-pool-blue', 'text-white');

  galleryItems.forEach(item => {
    if (item.dataset.category === 'process') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

function resetFilterButtons() {
  const filterButtons = [filterAll, filterCompleted, filterProcess];
  filterButtons.forEach(button => {
    button.classList.remove('bg-pool-blue', 'text-white');
    button.classList.add('bg-white', 'text-pool-dark');
  });
}

// Gallery Modal
const galleryModal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.querySelector('.close-modal');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let currentIndex = 0;
const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const items = visibleItems();
    currentIndex = items.indexOf(item);

    const mediaElement = item.querySelector('img, video');
    if (mediaElement.tagName === 'IMG') {
      modalImage.src = mediaElement.src;
      modalImage.style.display = 'block';
      modalVideo.style.display = 'none';
    } else if (mediaElement.tagName === 'VIDEO') {
      const videoSource = mediaElement.querySelector('source');
      modalVideo.querySelector('source').src = videoSource.src;
      modalVideo.load();
      modalImage.style.display = 'none';
      modalVideo.style.display = 'block';
    }

    galleryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  galleryModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  if (modalVideo.style.display === 'block') {
    modalVideo.pause();
  }
});

modalPrev.addEventListener('click', () => {
  const items = visibleItems();
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateModalContent(items[currentIndex]);
});

modalNext.addEventListener('click', () => {
  const items = visibleItems();
  currentIndex = (currentIndex + 1) % items.length;
  updateModalContent(items[currentIndex]);
});

function updateModalContent(item) {
  const mediaElement = item.querySelector('img, video');
  if (mediaElement.tagName === 'IMG') {
    modalImage.src = mediaElement.src;
    modalImage.style.display = 'block';
    modalVideo.style.display = 'none';
  } else if (mediaElement.tagName === 'VIDEO') {
    const videoSource = mediaElement.querySelector('source');
    modalVideo.querySelector('source').src = videoSource.src;
    modalVideo.load();
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.play();
  }
}

// Hover effect for video containers
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
  const video = container.querySelector('video');

  container.addEventListener('mouseenter', () => {
    video.muted = false;
  });
});

