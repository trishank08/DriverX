/* ============================================
   DRIVEX — BACKEND CONNECTION
   Connects to Express + MongoDB on port 5000
   ============================================ */
const API_URL = 'http://localhost:5000/api';

/* ── 1. HERO SECTION ─────────────────────────
   Targets your exact elements:
   #heroBg, .hero-title, .hero-subtitle,
   .hero-eyebrow, #hero-price
   ─────────────────────────────────────────── */
const loadHero = async () => {
  try {
    const res   = await fetch(`${API_URL}/models/featured`);
    const data  = await res.json();
    const model = data.data?.[0];
    if (!model) return;

    // Update your #heroBg background image
    const heroBg = document.getElementById('heroBg');
    const imgUrl = model.images?.find(i => i.isPrimary)?.url
                || model.images?.[0]?.url;
    if (heroBg && imgUrl) {
      heroBg.style.backgroundImage = `url('${imgUrl}')`;
    }

    // Update your .hero-title  (currently "OBSIDIAN")
    const titleEl = document.querySelector('.hero-title');
    if (titleEl) titleEl.textContent = model.name;

    // Update your .hero-subtitle
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (subtitleEl) subtitleEl.textContent = model.tagline;

    // Update your .hero-eyebrow (currently "Beyond Generation")
    const eyebrowEl = document.querySelector('.hero-eyebrow');
    if (eyebrowEl) {
      eyebrowEl.textContent = model.category === 'electric'
        ? 'All-Electric'
        : 'The New Generation';
    }

    // Show price in your #hero-price element
    const priceEl = document.getElementById('hero-price');
    if (priceEl && model.price?.base) {
      priceEl.textContent = `From £${model.price.base.toLocaleString()}`;
      priceEl.style.display = 'block';
    }

    console.log('✅ Hero loaded:', model.name);
  } catch (err) {
    console.warn('⚠️ Hero using static fallback');
  }
};

/* ── 2. MODELS GRID ──────────────────────────
   Replaces your 3 static cards with
   live data from MongoDB
   ─────────────────────────────────────────── */
const loadModels = async (category = '') => {
  try {
    const endpoint = category ? `/models?category=${category}` : '/models';
    const res      = await fetch(`${API_URL}${endpoint}`);
    const data     = await res.json();
    const models   = data.data || [];

    const grid = document.querySelector('.models-grid');
    if (!grid) return;

    // If no models in DB yet, keep your static cards
    if (models.length === 0) {
      console.warn('⚠️ No models in DB — keeping static cards. Run: node seed.js');
      return;
    }

    // Clear your 3 static cards
    grid.innerHTML = '';

    // Build a card for each model from MongoDB
    models.forEach((model, index) => {
      const imgUrl = model.images?.find(i => i.isPrimary)?.url
                  || model.images?.[0]?.url
                  || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=85';

      const price = model.price?.base
        ? `<p style="font-size:0.65rem;letter-spacing:0.15em;color:rgba(255,255,255,0.4);margin-top:0.5rem;font-weight:300;">From £${model.price.base.toLocaleString()}</p>`
        : '';

      const card = document.createElement('div');
      card.className = `model-card fade-in${index > 0 ? ` fade-in-delay-${Math.min(index, 3)}` : ''}`;

      card.innerHTML = `
        <img src="${imgUrl}" alt="${model.name}" loading="lazy">
        <div class="model-card-overlay">
          <p class="model-name">${model.name}</p>
          <p class="model-tag">${model.tagline}</p>
          ${price}
        </div>
        <div class="model-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#fff" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 7l10 10M17 7v10H7"/>
          </svg>
        </div>`;

      grid.appendChild(card);

      // Re-observe for your existing fade-in animation
      if (typeof fadeObserver !== 'undefined') {
        fadeObserver.observe(card);
      }
    });

    console.log(`✅ Models loaded: ${models.length} cars`);
  } catch (err) {
    console.warn('⚠️ Models using static fallback');
  }
};

/* ── 3. NEWSLETTER (if you add a form later) ─ */
const initNewsletter = () => {
  const form    = document.querySelector('form');
  const emailEl = document.querySelector('input[type="email"]');
  if (!form || !emailEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailEl.value.trim();
    const nameEl = document.querySelector('input[type="text"]');
    const firstName = nameEl?.value.trim() || '';
    if (!email) return;

    const btn = form.querySelector('button');
    const originalText = btn?.textContent || 'Subscribe';
    if (btn) { btn.textContent = 'Subscribing...'; btn.disabled = true; }

    try {
      const res  = await fetch(`${API_URL}/newsletter/subscribe`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, firstName }),
      });
      const data = await res.json();

      document.getElementById('nl-msg')?.remove();
      const msg = document.createElement('p');
      msg.id = 'nl-msg';
      msg.textContent = data.message;
      msg.style.cssText = `
        margin-top:1rem; font-size:0.72rem;
        letter-spacing:0.08em; font-weight:300;
        color: ${data.success ? 'rgba(100,220,150,0.9)' : 'rgba(220,100,100,0.9)'};`;
      form.insertAdjacentElement('afterend', msg);
      setTimeout(() => msg.remove(), 5000);
      if (data.success) { emailEl.value = ''; if (nameEl) nameEl.value = ''; }
    } catch (err) {
      console.error('Newsletter error:', err);
    } finally {
      if (btn) { btn.textContent = originalText; btn.disabled = false; }
    }
  });
};

/* ── INIT: Run on page load ──────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadHero();
  await loadModels();
  initNewsletter();
});
/* ============================================
   MENU TOGGLE
   Controls open/close state of the fullscreen
   navigation overlay and hamburger animation
   ============================================ */
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;

  const overlay = document.getElementById('menuOverlay');
  const btn     = document.getElementById('menuBtn');

  // Toggle .open class — drives CSS transitions
  overlay.classList.toggle('open', menuOpen);
  btn.classList.toggle('open', menuOpen);

  // Prevent page scroll when menu is open
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

// Close menu when clicking outside the panel (on the dark backdrop)
function handleOverlayClick(e) {
  const panel = document.getElementById('menuPanel');
  if (!panel.contains(e.target)) {
    toggleMenu();
  }
}

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) toggleMenu();
});


/* ============================================
   NAVBAR — SCROLL EFFECT
   Switches between transparent and glass style
   as user scrolls past 60px
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled',     scrolled);
  navbar.classList.toggle('transparent', !scrolled);
}, { passive: true });


/* ============================================
   HERO PARALLAX
   Moves the background image at 25% of scroll
   speed to create a depth / parallax effect
   ============================================ */
const heroBg = document.getElementById('heroBg');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Only apply within the hero viewport
  if (scrollY < window.innerHeight) {
    heroBg.style.transform =
      `scale(1.08) translateY(${scrollY * 0.25}px)`;
  }
}, { passive: true });


/* ============================================
   FADE-IN ON SCROLL
   Uses IntersectionObserver to detect when
   .fade-in elements enter the viewport, then
   adds .visible to trigger CSS transition
   ============================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Optional: stop observing once visible (one-shot animation)
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,        // Trigger when 12% visible
  rootMargin: '0px 0px -40px 0px' // 40px offset from bottom edge
});

fadeElements.forEach(el => fadeObserver.observe(el));


/* ============================================
   GALLERY STRIP — PAUSE ON HOVER
   (handled in CSS via animation-play-state,
   but JS fallback provided for older browsers)
   ============================================ */
const stripTrack = document.getElementById('stripTrack');

if (stripTrack) {
  stripTrack.addEventListener('mouseenter', () => {
    stripTrack.style.animationPlayState = 'paused';
  });
  stripTrack.addEventListener('mouseleave', () => {
    stripTrack.style.animationPlayState = 'running';
  });
}


/* ============================================
   SMOOTH ANCHOR SCROLLING (optional utility)
   If you add anchor links, this adds easing
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});