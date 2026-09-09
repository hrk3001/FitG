/**
 * FORGE & IRON ATHLETIC CLUB (FitG Platform)
 * High-Performance Client Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    selectedDay: 'all',
    selectedCategory: 'all',
    isAnnualBilling: false,
    classes: [],
    memberships: [],
    currentBookingClass: null
  };

  // Cache DOM Elements
  const elements = {
    classesGrid: document.getElementById('classes-grid'),
    dayFilters: document.getElementById('day-filters'),
    categoryFilters: document.getElementById('category-filters'),
    pricingGrid: document.getElementById('pricing-grid'),
    coachesGrid: document.getElementById('coaches-grid'),
    billingToggle: document.getElementById('billing-toggle'),
    labelMonthly: document.getElementById('label-monthly'),
    labelAnnual: document.getElementById('label-annual'),
    
    // Telemetry & Occupancy
    tickerOccupancy: document.getElementById('ticker-occupancy'),
    occupancyDesc: document.getElementById('occupancy-desc'),
    gaugeNumbers: document.getElementById('gauge-numbers'),
    gaugePercent: document.getElementById('gauge-percent'),
    gaugeBarFill: document.getElementById('gauge-bar-fill'),

    // Member Portal
    cardTier: document.getElementById('card-tier'),
    cardName: document.getElementById('card-name'),
    cardId: document.getElementById('card-id'),
    cardStatus: document.getElementById('card-status'),
    cardSince: document.getElementById('card-since'),
    cardStreak: document.getElementById('card-streak'),
    cardBarcodeLabel: document.getElementById('card-barcode-label'),
    prsGrid: document.getElementById('prs-grid'),
    bookedSessionsList: document.getElementById('booked-sessions-list'),
    activeBookingCount: document.getElementById('active-booking-count'),

    // Modals
    modalBooking: document.getElementById('modal-booking'),
    modalConfirmed: document.getElementById('modal-confirmed'),
    modalDaypass: document.getElementById('modal-daypass'),
    modalPr: document.getElementById('modal-pr'),
    staffDrawer: document.getElementById('staff-drawer'),

    // Forms
    formBooking: document.getElementById('form-booking'),
    formDaypass: document.getElementById('form-daypass'),
    formPr: document.getElementById('form-pr'),

    // Buttons
    btnOpenDaypass: document.getElementById('btn-open-daypass'),
    btnToggleStaff: document.getElementById('btn-toggle-staff'),
    btnCloseStaff: document.getElementById('btn-close-staff'),
    btnLogPrModal: document.getElementById('btn-log-pr-modal'),

    // Staff Drawer elements
    adminTotalBookings: document.getElementById('admin-total-bookings'),
    adminTotalPasses: document.getElementById('admin-total-passes'),
    adminUtilization: document.getElementById('admin-utilization'),
    adminFloorCount: document.getElementById('admin-floor-count'),
    ledgerTbody: document.getElementById('ledger-tbody'),
    passesTbody: document.getElementById('passes-tbody'),

    // Toast Container
    toastContainer: document.getElementById('toast-container')
  };

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    
    const icon = type === 'error' ? '⚠️' : '⚡';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // =========================================================================
  // MODAL MANAGEMENT (<dialog>)
  // =========================================================================
  function openModal(dialogElement) {
    if (dialogElement && typeof dialogElement.showModal === 'function') {
      dialogElement.showModal();
    }
  }

  function closeModal(dialogElement) {
    if (dialogElement && typeof dialogElement.close === 'function') {
      dialogElement.close();
    }
  }

  // Bind close buttons for all dialogs
  document.querySelectorAll('[data-close-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close-dialog');
      const targetDialog = document.getElementById(targetId);
      if (targetDialog) closeModal(targetDialog);
    });
  });

  // Close when clicking dialog backdrop
  [elements.modalBooking, elements.modalConfirmed, elements.modalDaypass, elements.modalPr].forEach(dialog => {
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          closeModal(dialog);
        }
      });
    }
  });

  // =========================================================================
  // TELEMETRY & CLUB INFO
  // =========================================================================
  async function loadClubTelemetry() {
    try {
      const res = await fetch('/api/club');
      const json = await res.json();
      if (!json.success) return;

      const { clubInfo } = { clubInfo: json.data };
      const occ = clubInfo.currentOccupancy;
      const pct = Math.round((occ.athletesInside / occ.maxCapacity) * 100);

      elements.tickerOccupancy.textContent = `FLOOR OCCUPANCY: ${occ.athletesInside} / ${occ.maxCapacity} ATHLETES (${occ.status.toUpperCase()})`;
      elements.occupancyDesc.textContent = `${occ.athletesInside} Athletes currently lifting on platforms & turf. ${occ.peakNote}.`;
      elements.gaugeNumbers.textContent = `${occ.athletesInside} / ${occ.maxCapacity} CAPACITY`;
      elements.gaugePercent.textContent = `${pct}%`;
      elements.gaugeBarFill.style.width = `${pct}%`;
    } catch (err) {
      console.warn('Telemetry load failed:', err);
    }
  }

  // =========================================================================
  // CLASS SCHEDULE & TIMETABLE
  // =========================================================================
  async function loadClasses() {
    try {
      const params = new URLSearchParams();
      if (state.selectedDay !== 'all') params.append('day', state.selectedDay);
      if (state.selectedCategory !== 'all') params.append('category', state.selectedCategory);

      const res = await fetch(`/api/classes?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        state.classes = json.data;
        renderClasses(json.data);
      }
    } catch (err) {
      elements.classesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--accent-red); padding: 40px;">
          Failed to load timetable. Please refresh the page.
        </div>
      `;
    }
  }

  function renderClasses(classes) {
    if (!classes || classes.length === 0) {
      elements.classesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 60px;">
          <p style="font-family: var(--font-mono); font-size: 0.9rem;">NO SESSIONS SCHEDULED FOR THIS CRITERIA.</p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters" style="margin-top: 14px;">Show All Sessions</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.selectedDay = 'all';
          state.selectedCategory = 'all';
          updateFilterButtons();
          loadClasses();
        });
      }
      return;
    }

    elements.classesGrid.innerHTML = classes.map(c => {
      const spotsClass = c.spotsRemaining === 0 ? 'full' : (c.spotsRemaining <= 3 ? 'low' : '');
      const spotsText = c.spotsRemaining === 0 ? 'SESSION FULL' : `${c.spotsRemaining} SPOTS OPEN`;
      const fillWidth = Math.min(100, Math.round((c.bookedCount / c.capacity) * 100));

      return `
        <article class="class-card" data-class-id="${c.id}">
          <div class="card-top">
            <div class="card-meta-line">
              <span class="class-time">
                <span>⏱</span> ${c.day.slice(0, 3).toUpperCase()} // ${c.time}
              </span>
              <span class="class-room-badge">${c.room}</span>
            </div>

            <h3 class="class-title">${c.title}</h3>
            
            <div class="class-coach">
              <span>Coached by:</span>
              <span class="coach-name">${c.trainer}</span>
              <span style="color: var(--text-muted); font-size: 0.72rem; font-family: var(--font-mono); font-weight: normal;">(${c.trainerCert})</span>
            </div>

            <p class="class-desc">${c.description}</p>

            <div class="equipment-tags">
              ${c.equipment.map(eq => `<span class="equip-tag">${eq}</span>`).join('')}
            </div>
          </div>

          <div class="card-footer">
            <div class="capacity-info">
              <span class="capacity-spots ${spotsClass}">${spotsText}</span>
              <div class="capacity-bar">
                <div class="capacity-fill" style="width: ${fillWidth}%;"></div>
              </div>
            </div>

            <button 
              class="btn ${c.isFull ? 'btn-secondary' : 'btn-primary'} btn-sm btn-book-class" 
              data-class-id="${c.id}"
              ${c.isFull ? 'disabled style="opacity: 0.45; cursor: not-allowed;"' : ''}
            >
              ${c.isFull ? 'Waitlist' : 'Reserve Spot'}
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to "Reserve Spot" buttons
    elements.classesGrid.querySelectorAll('.btn-book-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const classId = btn.getAttribute('data-class-id');
        initiateBooking(classId);
      });
    });
  }

  function initiateBooking(classId) {
    const targetClass = state.classes.find(c => c.id === classId);
    if (!targetClass) return;

    state.currentBookingClass = targetClass;

    // Fill Modal Information
    document.getElementById('booking-class-id').value = targetClass.id;
    document.getElementById('modal-booking-class-name').textContent = targetClass.title;
    document.getElementById('modal-booking-eyebrow').textContent = `${targetClass.track} // ${targetClass.day}`;
    document.getElementById('booking-class-time').textContent = targetClass.time;
    document.getElementById('booking-class-coach').textContent = `${targetClass.trainer} (${targetClass.trainerCert})`;
    document.getElementById('booking-class-room').textContent = targetClass.room;

    // Pre-fill demo member profile if available
    if (elements.cardName && elements.cardName.textContent) {
      document.getElementById('athlete-name').value = elements.cardName.textContent;
    }
    document.getElementById('athlete-email').value = 'arun.kumar@gmail.com';

    openModal(elements.modalBooking);
  }

  // Day filter click handlers
  elements.dayFilters.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.dayFilters.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedDay = btn.getAttribute('data-day');
      loadClasses();
    });
  });

  // Category filter click handlers
  elements.categoryFilters.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      elements.categoryFilters.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCategory = btn.getAttribute('data-category');
      loadClasses();
    });
  });

  function updateFilterButtons() {
    elements.dayFilters.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-day') === state.selectedDay);
    });
    elements.categoryFilters.querySelectorAll('.cat-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === state.selectedCategory);
    });
  }

  // =========================================================================
  // SUBMIT BOOKING FORM
  // =========================================================================
  elements.formBooking.addEventListener('submit', async (e) => {
    e.preventDefault();

    const classId = document.getElementById('booking-class-id').value;
    const athleteName = document.getElementById('athlete-name').value;
    const athleteEmail = document.getElementById('athlete-email').value;
    const athletePhone = document.getElementById('athlete-phone').value;
    const experienceLevel = document.getElementById('athlete-exp').value;

    const submitBtn = elements.formBooking.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Securing Spot...';

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId,
          athleteName,
          athleteEmail,
          athletePhone,
          experienceLevel
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Booking reservation failed');
      }

      // Close booking modal
      closeModal(elements.modalBooking);
      elements.formBooking.reset();

      // Show confirmation ticket modal
      const booking = data.data;
      document.getElementById('receipt-athlete').textContent = booking.athleteName;
      document.getElementById('receipt-class').textContent = booking.className;
      document.getElementById('receipt-schedule').textContent = `${booking.classDay} @ ${booking.classTime}`;
      document.getElementById('receipt-room').textContent = booking.room;
      document.getElementById('receipt-booking-id').textContent = booking.id;

      openModal(elements.modalConfirmed);
      showToast(`Spot Confirmed: ${booking.className} (${booking.id})`);

      // Refresh schedule and member dashboard
      loadClasses();
      loadMemberProfile();
      loadAdminOverview();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Spot Reservation';
    }
  });

  // =========================================================================
  // MEMBERSHIP TIERS
  // =========================================================================
  async function loadMemberships() {
    try {
      const res = await fetch('/api/memberships');
      const json = await res.json();
      if (json.success) {
        state.memberships = json.data;
        renderMemberships();
      }
    } catch (err) {
      console.warn('Membership fetch failed:', err);
    }
  }

  function renderMemberships() {
    elements.pricingGrid.innerHTML = state.memberships.map(plan => {
      const price = state.isAnnualBilling && plan.priceAnnual ? plan.priceAnnual : plan.priceMonthly;
      const isFeatured = plan.id === 'tier-quarterly' || plan.id === 'tier-annual';
      const periodLabel = plan.type === 'dropin' ? 'Single Pass' : (plan.id === 'tier-annual' && state.isAnnualBilling ? 'Full Year (Annual Offer)' : (plan.id === 'tier-annual' ? '12 Months VIP' : '3 Months (Quarterly)'));

      return `
        <div class="pricing-card ${isFeatured ? 'featured' : ''}">
          ${plan.badge ? `<div class="pricing-badge">${plan.badge}</div>` : ''}
          
          <div>
            <div class="plan-header">
              <h3 class="plan-name">${plan.name}</h3>
              <div class="plan-price-wrap">
                <span class="plan-currency">₹</span>
                <span class="plan-price">${price.toLocaleString('en-IN')}</span>
                <span class="plan-period">${periodLabel}</span>
              </div>
              <p class="plan-desc">${plan.description}</p>
            </div>

            <ul class="plan-perks">
              ${plan.perks.map(perk => `
                <li>
                  <span class="perk-check">✓</span>
                  <span>${perk}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <button class="btn ${isFeatured ? 'btn-primary' : 'btn-secondary'} btn-block btn-select-plan" data-plan-id="${plan.id}">
            ${plan.type === 'dropin' ? 'Get 1-Day Trial Pass' : 'Join This Plan'}
          </button>
        </div>
      `;
    }).join('');

    elements.pricingGrid.querySelectorAll('.btn-select-plan').forEach(btn => {
      btn.addEventListener('click', () => {
        const planId = btn.getAttribute('data-plan-id');
        if (planId === 'tier-day') {
          openModal(elements.modalDaypass);
        } else {
          showToast('Selected membership tier queued. Redirecting to onboard desk...');
          setTimeout(() => {
            const lockerSection = document.getElementById('locker-room');
            if (lockerSection) lockerSection.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        }
      });
    });
  }

  // Annual/Monthly Switch handler
  elements.billingToggle.addEventListener('click', () => {
    state.isAnnualBilling = !state.isAnnualBilling;
    elements.billingToggle.classList.toggle('active', state.isAnnualBilling);
    elements.billingToggle.setAttribute('aria-checked', String(state.isAnnualBilling));

    if (state.isAnnualBilling) {
      elements.labelAnnual.style.color = '#ffffff';
      elements.labelAnnual.style.fontWeight = '700';
      elements.labelMonthly.style.color = 'var(--text-secondary)';
      elements.labelMonthly.style.fontWeight = 'normal';
    } else {
      elements.labelMonthly.style.color = '#ffffff';
      elements.labelMonthly.style.fontWeight = '700';
      elements.labelAnnual.style.color = 'var(--text-secondary)';
      elements.labelAnnual.style.fontWeight = 'normal';
    }

    renderMemberships();
  });

  // =========================================================================
  // COACHES & DIRECTORS
  // =========================================================================
  async function loadCoaches() {
    try {
      const res = await fetch('/api/trainers');
      const json = await res.json();
      if (!json.success) return;

      elements.coachesGrid.innerHTML = json.data.map(t => `
        <div class="coach-card">
          <div class="coach-header">
            <h3 class="coach-title">${t.name}</h3>
            <div class="coach-role">${t.role}</div>
            <div class="coach-certs">${t.credentials} // ${t.experience}</div>
          </div>

          <div class="coach-quote">"${t.quote}"</div>

          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
            ${t.bio}
          </p>

          <div style="border-top: 1px solid var(--border-hairline); padding-top: 14px; margin-top: auto;">
            <div class="coach-specialty">
              SPECIALTY: <span>${t.specialty}</span>
            </div>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.warn('Coaches load error:', err);
    }
  }

  // =========================================================================
  // MEMBER LOCKER ROOM PORTAL
  // =========================================================================
  async function loadMemberProfile() {
    try {
      const res = await fetch('/api/members/me');
      const json = await res.json();
      if (!json.success) return;

      const m = json.data;

      // Populate Digital Card
      elements.cardName.textContent = m.name;
      elements.cardTier.textContent = m.membershipTier;
      elements.cardId.textContent = `ID: ${m.id}`;
      elements.cardStatus.textContent = m.status;
      elements.cardSince.textContent = m.memberSince;
      elements.cardStreak.textContent = `${m.attendanceStreak} Days`;
      elements.cardBarcodeLabel.textContent = `FORGE-${m.id}-SECURE`;

      // Render PRs
      elements.prsGrid.innerHTML = m.personalRecords.map(pr => `
        <div class="pr-card">
          <div class="pr-lift">${pr.lift}</div>
          <div class="pr-value">${pr.value}</div>
          <div class="pr-date">Date: ${pr.date}</div>
          <div class="pr-coach-badge">Witness: ${pr.verifiedBy}</div>
        </div>
      `).join('');

      // Render Active Bookings
      renderActiveBookings(m.activeBookings || []);
    } catch (err) {
      console.warn('Member profile load error:', err);
    }
  }

  function renderActiveBookings(bookings) {
    elements.activeBookingCount.textContent = `${bookings.length} Session${bookings.length === 1 ? '' : 's'} Confirmed`;

    if (!bookings || bookings.length === 0) {
      elements.bookedSessionsList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.8rem;">
          No active platform reservations. Reserve a spot from the timetable above.
        </div>
      `;
      return;
    }

    elements.bookedSessionsList.innerHTML = bookings.map(b => `
      <div class="booked-session-item" data-booking-id="${b.id}">
        <div class="session-info">
          <h5>${b.className}</h5>
          <div class="session-meta">
            <span>📅 ${b.classDay} @ ${b.classTime}</span>
            <span>📍 ${b.room}</span>
            <span>Coach: ${b.trainer}</span>
            <span style="color: var(--accent-volt);">Ref: ${b.id}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm btn-cancel-booking" data-booking-id="${b.id}" style="color: var(--accent-red); border-color: rgba(255,51,68,0.3);">
          Cancel Spot
        </button>
      </div>
    `).join('');

    elements.bookedSessionsList.querySelectorAll('.btn-cancel-booking').forEach(btn => {
      btn.addEventListener('click', async () => {
        const bookingId = btn.getAttribute('data-booking-id');
        if (confirm(`Cancel reservation ${bookingId}? This will immediately release your platform spot.`)) {
          await cancelBooking(bookingId);
        }
      });
    });
  }

  async function cancelBooking(bookingId) {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to cancel reservation');
      }

      showToast(`Reservation ${bookingId} cancelled. Platform spot released.`);
      loadMemberProfile();
      loadClasses();
      loadAdminOverview();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // =========================================================================
  // LOG PR MODAL FORM
  // =========================================================================
  elements.btnLogPrModal.addEventListener('click', () => {
    openModal(elements.modalPr);
  });

  elements.formPr.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lift = document.getElementById('pr-lift').value;
    const value = document.getElementById('pr-value').value;
    const verifiedBy = document.getElementById('pr-coach').value;

    const submitBtn = elements.formPr.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/members/prs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lift, value, verifiedBy })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Could not log PR');
      }

      closeModal(elements.modalPr);
      elements.formPr.reset();
      showToast(`Personal Record Logged: ${lift} — ${value}`);
      loadMemberProfile();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // =========================================================================
  // DAY PASS MODAL FORM
  // =========================================================================
  elements.btnOpenDaypass.addEventListener('click', () => {
    document.getElementById('daypass-success').style.display = 'none';
    elements.formDaypass.style.display = 'block';
    elements.formDaypass.reset();
    openModal(elements.modalDaypass);
  });

  elements.formDaypass.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('pass-name').value;
    const email = document.getElementById('pass-email').value;
    const phone = document.getElementById('pass-phone').value;
    const trainingFocus = document.getElementById('pass-focus').value;

    const submitBtn = elements.formDaypass.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Generating Pass...';

    try {
      const res = await fetch('/api/day-pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, trainingFocus })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to generate guest pass');
      }

      const pass = json.data;
      elements.formDaypass.style.display = 'none';
      const successBox = document.getElementById('daypass-success');
      successBox.style.display = 'block';

      document.getElementById('success-pass-name').textContent = pass.name;
      document.getElementById('success-pass-expiry').textContent = new Date(pass.expiresAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
      document.getElementById('success-pass-code').textContent = pass.passCode;

      showToast(`24-Hour Guest Pass Activated: ${pass.passCode}`);
      loadAdminOverview();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Issue Digital Guest Pass';
    }
  });

  // =========================================================================
  // STAFF OPERATIONS DESK (ADMIN DRAWER)
  // =========================================================================
  elements.btnToggleStaff.addEventListener('click', () => {
    elements.staffDrawer.classList.toggle('open');
    if (elements.staffDrawer.classList.contains('open')) {
      loadAdminOverview();
    }
  });

  elements.btnCloseStaff.addEventListener('click', () => {
    elements.staffDrawer.classList.remove('open');
  });

  async function loadAdminOverview() {
    try {
      const res = await fetch('/api/admin/overview');
      const json = await res.json();
      if (!json.success) return;

      const { stats, recentBookings, recentDayPasses } = json.data;

      elements.adminTotalBookings.textContent = stats.totalBookings;
      elements.adminTotalPasses.textContent = stats.totalDayPasses;
      elements.adminUtilization.textContent = stats.overallCapacityUtilization;
      elements.adminFloorCount.textContent = `${stats.activeAthletesOnFloor} / ${stats.maxCapacity}`;

      // Render Ledger Table
      elements.ledgerTbody.innerHTML = recentBookings.map(b => `
        <tr>
          <td><span style="color: var(--accent-volt); font-weight:700;">${b.id}</span></td>
          <td>${b.athleteName}</td>
          <td>${b.className}</td>
          <td>
            <span style="color: ${b.status === 'confirmed' ? 'var(--accent-volt)' : 'var(--text-muted)'};">
              ${b.status.toUpperCase()}
            </span>
          </td>
          <td>
            ${b.status === 'confirmed' ? `
              <button class="btn btn-secondary btn-sm btn-admin-cancel" data-id="${b.id}" style="padding: 2px 6px; font-size: 0.68rem; color: var(--accent-red);">
                Void
              </button>
            ` : '—'}
          </td>
        </tr>
      `).join('');

      // Render Passes Table
      elements.passesTbody.innerHTML = recentDayPasses.map(p => `
        <tr>
          <td><span style="color: var(--accent-cyan); font-weight:700;">${p.passCode}</span></td>
          <td>${p.name}</td>
          <td>${new Date(p.issuedAt).toLocaleDateString()}</td>
          <td><span style="color: var(--accent-volt);">${p.status.toUpperCase()}</span></td>
        </tr>
      `).join('');

      // Void action listeners
      elements.ledgerTbody.querySelectorAll('.btn-admin-cancel').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          await cancelBooking(id);
        });
      });
    } catch (err) {
      console.warn('Admin overview error:', err);
    }
  }

  // =========================================================================
  // INITIAL BOOTSTRAP
  // =========================================================================
  loadClubTelemetry();
  loadClasses();
  loadMemberships();
  loadCoaches();
  loadMemberProfile();
});
