// Excursion Seven Marketing Group - Interactive Site Controller

const formLoadTimestamp = Date.now();

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initHeaderScroll();
  initMobileMenu();
  initTickerFeed();
  initCalculator();
  initFaqAccordion();
  initModal();
  initForms();
  initSmoothScroll();
});

/* Helper to safely initialize icons */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* --------------------------------------------------
   1. Header Scroll Effect
-------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------
   2. Mobile Navigation Toggle
-------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* --------------------------------------------------
   3. Localized Live Lead Dispatch Ticker (Farmington Hills & Nearby)
-------------------------------------------------- */
const sampleLeads = [
  { trade: 'Tree Trimming & Removal', location: 'Farmington Hills, MI (48331)', status: 'Priority Partner Claimed', time: '1m ago' },
  { trade: 'Gutter Flushing & Guards', location: 'West Bloomfield, MI (48322)', status: 'First Right Window Open', time: '3m ago' },
  { trade: 'Lawn Restoration & Cleanup', location: 'Novi, MI (48375)', status: 'Priority Partner Claimed', time: '5m ago' },
  { trade: 'Window & Pressure Wash', location: 'Livonia, MI (48152)', status: 'Priority Partner Claimed', time: '8m ago' },
  { trade: 'Hazardous Oak Removal', location: 'Commerce Twp, MI (48382)', status: 'First Right Window Open', time: '12m ago' },
  { trade: 'Deck Staining & Exterior Repair', location: 'Birmingham, MI (48009)', status: 'Priority Partner Claimed', time: '15m ago' },
  { trade: 'Overgrown Yard Clearing', location: 'Southfield, MI (48076)', status: 'First Right Window Open', time: '18m ago' },
  { trade: 'Roof & Siding Soft Wash', location: 'Troy, MI (48084)', status: 'Priority Partner Claimed', time: '22m ago' }
];

function initTickerFeed() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  function renderTicker() {
    track.innerHTML = sampleLeads.map(lead => `
      <div class="ticker-item">
        <i data-lucide="zap" style="color: var(--primary); width: 14px; height: 14px;"></i>
        <span><strong>${lead.trade}</strong> • ${lead.location}</span>
        <span class="status-pill" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${lead.status}</span>
        <span style="color: var(--text-subtle); font-size: 0.75rem;">${lead.time}</span>
      </div>
    `).join('');

    initIcons();
  }

  renderTicker();

  setInterval(() => {
    const item = sampleLeads.shift();
    sampleLeads.push(item);
    renderTicker();
  }, 8000);
}

/* --------------------------------------------------
   4. Interactive Lead & Revenue Yield Calculator
-------------------------------------------------- */
const tradeValues = {
  tree: { avgValue: 1200, name: 'Tree Services' },
  lawn: { avgValue: 350, name: 'Lawn & Yard Care' },
  gutter: { avgValue: 280, name: 'Gutter Cleaning' },
  window: { avgValue: 320, name: 'Window Washing' },
  home: { avgValue: 550, name: 'Home Services' }
};

function initCalculator() {
  const calcTrade = document.getElementById('calcTrade');
  const calcLeads = document.getElementById('calcLeads');
  const calcLeadsVal = document.getElementById('calcLeadsVal');
  const calcCloseRate = document.getElementById('calcCloseRate');
  const calcCloseVal = document.getElementById('calcCloseVal');

  const resRevenue = document.getElementById('resRevenue');
  const resJobsWon = document.getElementById('resJobsWon');
  const resPriority = document.getElementById('resPriority');

  if (!calcTrade || !calcLeads || !calcCloseRate) return;

  function updateCalculations() {
    const selectedTradeKey = calcTrade.value;
    const avgOrderValue = tradeValues[selectedTradeKey]?.avgValue || 500;
    
    const leadsCount = parseInt(calcLeads.value, 10);
    const closePercentage = parseInt(calcCloseRate.value, 10);

    calcLeadsVal.textContent = `${leadsCount} Leads / month`;
    calcCloseVal.textContent = `${closePercentage}% Close Rate`;

    const jobsWon = Math.round(leadsCount * (closePercentage / 100));
    const estimatedRevenue = jobsWon * avgOrderValue;

    resRevenue.textContent = `$${estimatedRevenue.toLocaleString()}`;
    resJobsWon.textContent = `${jobsWon} Jobs Won`;
    
    if (leadsCount >= 30) {
      resPriority.textContent = '#1 Exclusive Tier';
    } else {
      resPriority.textContent = '#1 Priority Zone';
    }
  }

  calcTrade.addEventListener('change', updateCalculations);
  calcLeads.addEventListener('input', updateCalculations);
  calcCloseRate.addEventListener('input', updateCalculations);

  updateCalculations();
}

/* --------------------------------------------------
   5. Interactive FAQ Accordion
-------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------
   6. Anti-Spam Bot Filter Protection Engine
-------------------------------------------------- */
function validateHumanSubmission(honeypotId, humanCheckId) {
  // 1. Honeypot check: If hidden honeypot field is filled out, it's an automated bot
  const honeypotField = document.getElementById(honeypotId);
  if (honeypotField && honeypotField.value.trim() !== '') {
    console.warn('[Bot Filter] Submission blocked: Honeypot field triggered.');
    return { isHuman: false, reason: 'honeypot' };
  }

  // 2. Time-gate check: Automated spam scripts submit forms in < 1.8 seconds
  const elapsedTime = Date.now() - formLoadTimestamp;
  if (elapsedTime < 1800) {
    console.warn('[Bot Filter] Submission blocked: Rapid-fire submission detected.');
    return { isHuman: false, reason: 'timegate' };
  }

  // 3. Human verification checkbox check
  const humanCheck = document.getElementById(humanCheckId);
  if (humanCheck && !humanCheck.checked) {
    return { isHuman: false, reason: 'checkbox' };
  }

  return { isHuman: true };
}

/* --------------------------------------------------
   7. Partner Enrollment Modal Logic
-------------------------------------------------- */
function initModal() {
  const modal = document.getElementById('enrollModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const inquireTradeBtn = document.getElementById('inquireTradeBtn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (inquireTradeBtn) inquireTradeBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const verification = validateHumanSubmission('m_website_url', 'mHumanCheck');
      
      if (!verification.isHuman) {
        if (verification.reason === 'checkbox') {
          showToast('Security Error: Please check the "I am a human" verification box.');
        } else {
          // Silent bot block to prevent spam scripts from adapting
          showToast('Automated submission filtered. Please try again.');
        }
        return;
      }

      closeModal();
      showToast('Territory slot check requested! Our Farmington Hills team will reach out shortly.');
      modalForm.reset();
    });
  }
}

/* --------------------------------------------------
   8. Form Handling & Toast Notifications
-------------------------------------------------- */
function initForms() {
  const contractorForm = document.getElementById('contractorForm');
  
  if (contractorForm) {
    contractorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const verification = validateHumanSubmission('b_website_url', 'cHumanCheck');

      if (!verification.isHuman) {
        if (verification.reason === 'checkbox') {
          showToast('Security Error: Please check the "I am a human" verification box.');
        } else {
          showToast('Automated submission filtered. Please try again.');
        }
        return;
      }

      showToast('Application Verified & Submitted! An E7 Farmington Hills specialist will contact you shortly.');
      contractorForm.reset();
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* --------------------------------------------------
   9. Smooth Scroll for Navigation Anchors
-------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
