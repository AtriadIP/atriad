const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('nav-menu');
const yearEl = document.getElementById('year');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('is-open');
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('contact-form');
const contactModal = document.getElementById('contact-modal');
const contactClose = document.querySelectorAll('[data-contact-close]');

const openContactModal = () => {
  if (!contactModal) {
    return;
  }
  contactModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  const closeButton = contactModal.querySelector('.contact-modal__close');
  if (closeButton) {
    closeButton.focus();
  }
};

const closeContactModal = () => {
  if (!contactModal) {
    return;
  }
  contactModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
};

if (form) {
  const nameInput = form.querySelector('[name="entry.1393264654"]');
  const emailInput = form.querySelector('[name="entry.434696394"]');
  const phoneInput = form.querySelector('[name="entry.1783201184"]');
  const practiceInput = form.querySelector('[name="entry.620736947"]');
  const messageInput = form.querySelector('[name="entry.1052772800"]');

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '');
      phoneInput.setCustomValidity('');
    });
  }

  [nameInput, emailInput, phoneInput, practiceInput, messageInput].forEach((field) => {
    if (!field) {
      return;
    }
    field.addEventListener('input', () => {
      field.setCustomValidity('');
    });
  });

  const validateForm = () => {
    let valid = true;
    const nameValue = nameInput ? nameInput.value.trim() : '';
    const phoneValue = phoneInput ? phoneInput.value.trim() : '';
    const practiceValue = practiceInput ? practiceInput.value.trim() : '';
    const messageValue = messageInput ? messageInput.value.trim() : '';

    if (nameInput && (nameValue.length < 2 || !/[a-zA-Z]/.test(nameValue))) {
      nameInput.setCustomValidity('Please enter a valid name.');
      valid = false;
    }

    if (phoneInput && !/^\d{10,15}$/.test(phoneValue)) {
      phoneInput.setCustomValidity('Please enter a valid phone number.');
      valid = false;
    }

    if (practiceInput && practiceValue && practiceValue.length < 3) {
      practiceInput.setCustomValidity('Please enter at least 3 characters.');
      valid = false;
    }

    if (messageInput && messageValue && messageValue.length < 3) {
      messageInput.setCustomValidity('Please enter at least 3 characters.');
      valid = false;
    }

    if (!valid) {
      form.reportValidity();
    }

    return valid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
    form.reset();
    openContactModal();
  });
}

if (contactClose.length) {
  contactClose.forEach((button) => {
    button.addEventListener('click', closeContactModal);
  });
}

if (contactModal) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !contactModal.hasAttribute('hidden')) {
      closeContactModal();
    }
  });
}

const disclaimer = document.querySelector('.disclaimer');
const disclaimerButton = document.getElementById('disclaimer-continue');

if (disclaimer) {
  const showDisclaimer = () => disclaimer.classList.add('is-active');
  const hideDisclaimer = () => disclaimer.classList.remove('is-active');
  const disclaimerSeenKey = 'disclaimer-seen';
  const hasSeenDisclaimer = sessionStorage.getItem(disclaimerSeenKey) === 'true';

  if (!hasSeenDisclaimer) {
    showDisclaimer();
  }

  if (disclaimerButton) {
    disclaimerButton.addEventListener('click', () => {
      hideDisclaimer();
      sessionStorage.setItem(disclaimerSeenKey, 'true');
    });
  }
}

const ipCards = document.querySelectorAll('.ip__card[data-ip]');
const ipModal = document.getElementById('ip-modal');
const ipModalTitle = document.getElementById('ip-modal-title');
const ipModalBody = document.getElementById('ip-modal-body');
const ipModalClose = document.querySelectorAll('[data-ip-close]');

const ipDetails = {
  trademarks: {
    title: 'Trademarks',
    intro: 'Build distinct brand identity and secure exclusive rights for names, logos, and taglines in your core markets.',
    note: 'We support clearance, filing, prosecution, and enforcement so your brand stays protected as you scale.',
    bullets: ['Trademark availability searches', 'Filing and prosecution', 'Oppositions and rectifications', 'Brand enforcement and takedowns'],
  },
  copyrights: {
    title: 'Copyrights',
    intro: 'Safeguard original works across content, software, music, and visual media with clear ownership records.',
    note: 'We help creators and businesses manage registrations, assignments, and licensing for every asset.',
    bullets: ['Copyright registrations', 'Assignments and licensing', 'Content takedowns and disputes', 'Digital rights guidance'],
  },
  designs: {
    title: 'Designs',
    intro: 'Protect the look and feel of products, packaging, and interfaces with design registrations.',
    note: 'Design protection strengthens market presence and deters copycats across product categories.',
    bullets: ['Design novelty assessment', 'Filing and prosecution', 'Design infringement actions', 'Portfolio renewals'],
  },
  patents: {
    title: 'Patents',
    intro: 'Secure exclusive rights for inventions, processes, and technologies that differentiate your business.',
    note: 'We guide you from drafting to grant, including responses to examination and opposition.',
    bullets: ['Patentability analysis', 'Drafting and filing', 'Office action responses', 'Patent enforcement support'],
  },
  media: {
    title: 'Media and Entertainment Law',
    intro: 'Support creators, studios, and platforms with rights management across film, music, and digital media.',
    note: 'We structure contracts and clearances so content can be monetized safely and globally.',
    bullets: ['Artist and talent agreements', 'Rights clearance and licensing', 'Production and distribution contracts', 'Content protection strategy'],
  },
};

const buildIpBody = (detail) => {
  const bullets = detail.bullets.map((item) => `<li>${item}</li>`).join('');
  return `<p>${detail.intro}</p><p>${detail.note}</p><ul>${bullets}</ul>`;
};

const openIpModal = (key) => {
  const detail = ipDetails[key];
  if (!detail || !ipModal || !ipModalTitle || !ipModalBody) {
    return;
  }
  ipModalTitle.textContent = detail.title;
  ipModalBody.innerHTML = buildIpBody(detail);
  ipModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
};

const closeIpModal = () => {
  if (!ipModal) {
    return;
  }
  ipModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
};

ipCards.forEach((card) => {
  card.addEventListener('click', () => {
    openIpModal(card.dataset.ip);
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openIpModal(card.dataset.ip);
    }
  });
});

if (ipModalClose.length) {
  ipModalClose.forEach((el) => {
    el.addEventListener('click', closeIpModal);
  });
}

if (ipModal) {
  ipModal.addEventListener('click', (event) => {
    if (event.target === ipModal) {
      closeIpModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !ipModal.hasAttribute('hidden')) {
      closeIpModal();
    }
  });
}

const ipCarousel = document.querySelector('.ip__carousel');
if (ipCarousel) {
  const track = ipCarousel.querySelector('.ip__cards');
  const prevButton = ipCarousel.querySelector('.ip__nav--prev');
  const nextButton = ipCarousel.querySelector('.ip__nav--next');
  const originalSlides = Array.from(track.children);
  let slideWidth = 0;
  let index = 1;
  let timer = null;

  if (originalSlides.length) {
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    firstClone.classList.add('is-clone');
    lastClone.classList.add('is-clone');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalSlides[0]);
  }

  const slides = Array.from(track.children);

  const setTransition = (enabled) => {
    track.style.transition = enabled ? 'transform 0.45s ease' : 'none';
  };

  const updateMetrics = () => {
    if (!slides.length) {
      return;
    }
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    slideWidth = slides[0].getBoundingClientRect().width + gap;
  };

  const goTo = (nextIndex, animate = true) => {
    if (!slides.length) {
      return;
    }
    index = nextIndex;
    setTransition(animate);
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  };

  const start = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      goTo(index + 1);
    }, 3000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  updateMetrics();
  goTo(index, false);
  start();

  track.addEventListener('transitionend', () => {
    const current = slides[index];
    if (current && current.classList.contains('is-clone')) {
      const targetIndex = index === 0 ? slides.length - 2 : 1;
      goTo(targetIndex, false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransition(true));
      });
    }
  });

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goTo(index - 1);
      start();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goTo(index + 1);
      start();
    });
  }

  ipCarousel.addEventListener('mouseenter', stop);
  ipCarousel.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => {
    updateMetrics();
    goTo(index, false);
  });
}

const testimonialsCarousel = document.querySelector('.testimonials__carousel');
const testimonialsTrack = document.querySelector('[data-testimonials]');
const testimonialsForm = document.querySelector('[data-testimonial-form]');
const reviewModal = document.getElementById('review-modal');
const reviewClose = document.querySelectorAll('[data-review-close]');

const openReviewModal = () => {
  if (!reviewModal) {
    return;
  }
  reviewModal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  const closeButton = reviewModal.querySelector('.review-modal__close');
  if (closeButton) {
    closeButton.focus();
  }
};

const closeReviewModal = () => {
  if (!reviewModal) {
    return;
  }
  reviewModal.setAttribute('hidden', '');
  document.body.style.overflow = '';
};

if (testimonialsCarousel && testimonialsTrack) {
  const prevButton = testimonialsCarousel.querySelector('.testimonials__nav--prev');
  const nextButton = testimonialsCarousel.querySelector('.testimonials__nav--next');
  const sheetId = '18hMDS_3Xr2GIV-MLZ-q8fL4hI8fWCLNWodbzVo-MNVM';
  const sheetName = 'Form_Responses';
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTP5ckriT5X0mFQXjDws5D9gIKJFYN8LviQvLtsZrLnMzG2ToS3vLJJuT2LOmIVp4QwfwofODgQ1DGH/pub?gid=1135494338&single=true&output=csv';
  let slides = [];
  let index = 0;
  let slideWidth = 0;
  let timer = null;

  const buildStars = (rating) => {
    const safeRating = Math.max(1, Math.min(5, rating));
    return '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);
  };

  const createCard = ({ name, review, rating }) => {
    const card = document.createElement('article');
    card.className = 'testimonials__card';
    if (review && review.length > 140) {
      card.classList.add('is-long');
    }
    const stars = document.createElement('div');
    stars.className = 'testimonials__stars';
    stars.setAttribute('aria-label', `${rating} out of 5 stars`);
    stars.textContent = buildStars(rating);
    const body = document.createElement('p');
    body.textContent = review;
    const author = document.createElement('strong');
    author.textContent = name;
    card.append(stars, body, author);
    return card;
  };

  const parseCsv = (text) => {
    const rows = [];
    let row = [];
    let value = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (inQuotes) {
        if (char === '"') {
          if (text[i + 1] === '"') {
            value += '"';
            i += 1;
          } else {
            inQuotes = false;
          }
        } else {
          value += char;
        }
      } else if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(value);
        value = '';
      } else if (char === '\n') {
        row.push(value.replace(/\r$/, ''));
        rows.push(row);
        row = [];
        value = '';
      } else {
        value += char;
      }
    }

    if (value.length || row.length) {
      row.push(value);
      rows.push(row);
    }

    return rows;
  };

  const updateMetrics = () => {
    if (!slides.length) {
      return;
    }
    const gap = parseFloat(getComputedStyle(testimonialsTrack).gap || '0');
    slideWidth = slides[0].getBoundingClientRect().width + gap;
  };

  const setTransition = (enabled) => {
    testimonialsTrack.style.transition = enabled ? 'transform 0.4s ease' : 'none';
  };

  const goTo = (nextIndex, animate = true) => {
    if (!slides.length) {
      return;
    }
    const total = slides.length;
    index = ((nextIndex % total) + total) % total;
    setTransition(animate);
    testimonialsTrack.style.transform = `translateX(${-index * slideWidth}px)`;
  };

  const start = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      goTo(index + 1);
    }, 2000);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const rebuild = () => {
    slides = Array.from(testimonialsTrack.children);
    testimonialsTrack.dataset.count = String(slides.length);
    if (!slides.length) {
      stop();
      return;
    }
    updateMetrics();
    goTo(0, false);
    if (slides.length > 1) {
      start();
    } else {
      stop();
    }
  };

  const buildItemsFromSheet = (rows) => {
    if (rows.length < 2) {
      return [];
    }
    const headers = rows[0].map((header) => header.replace(/^﻿/, '').trim().toLowerCase());
    const nameIndex = headers.indexOf('name');
    const starsIndex = headers.indexOf('stars');
    const reviewIndex = headers.indexOf('review');
    const orderIndex = headers.indexOf('sr no');

    if (nameIndex === -1 || starsIndex === -1 || reviewIndex === -1) {
      return [];
    }

    const items = rows.slice(1).map((row) => {
      const name = (row[nameIndex] || '').trim();
      const review = (row[reviewIndex] || '').trim();
      const rating = Number(row[starsIndex] || 0);
      const order = Number(row[orderIndex] || 0);
      return { name, review, rating, order };
    }).filter((item) => item.name && item.review && item.rating);

    if (orderIndex !== -1) {
      items.sort((a, b) => a.order - b.order);
    }

    return items;
  };

  const populateFromSheet = async () => {
    try {
      const response = await fetch(csvUrl, { cache: 'no-store' });
      if (!response.ok) {
        return;
      }
      const csvText = await response.text();
      const rows = parseCsv(csvText);
      const items = buildItemsFromSheet(rows);
      if (!items.length) {
        return;
      }
      testimonialsTrack.innerHTML = '';
      items.forEach((item) => {
        testimonialsTrack.appendChild(createCard(item));
      });
      rebuild();
    } catch (error) {
      // Keep the default testimonials if the sheet is unreachable.
    }
  };

  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goTo(index - 1);
      start();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goTo(index + 1);
      start();
    });
  }

  testimonialsCarousel.addEventListener('mouseenter', stop);
  testimonialsCarousel.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => {
    updateMetrics();
    goTo(index, false);
  });

  rebuild();
  populateFromSheet();


  if (reviewClose.length) {
    reviewClose.forEach((button) => {
      button.addEventListener('click', closeReviewModal);
    });
  }

  if (reviewModal) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !reviewModal.hasAttribute('hidden')) {
        closeReviewModal();
      }
    });
  }

  if (testimonialsForm) {
    testimonialsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!testimonialsForm.reportValidity()) {
        return;
      }
      const formData = new FormData(testimonialsForm);
      fetch(testimonialsForm.action, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      testimonialsForm.reset();
      openReviewModal();
    });
  }
}
