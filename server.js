const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// REST API ROUTES
// ==========================================

// Health check for deployment monitoring (Render, Railway, Fly.io, Docker)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Club general information & live floor occupancy
app.get('/api/club', (req, res) => {
  try {
    const info = db.getClubInfo();
    res.json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Classes list with filters (day, category)
app.get('/api/classes', (req, res) => {
  try {
    const { day, category } = req.query;
    const classes = db.getClasses(day, category);
    res.json({ success: true, count: classes.length, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Single class detail
app.get('/api/classes/:id', (req, res) => {
  try {
    const classItem = db.getClassById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    res.json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Book a spot in a class
app.post('/api/bookings', (req, res) => {
  try {
    const { classId, athleteName, athleteEmail, athletePhone, experienceLevel } = req.body;

    if (!classId || !athleteName || !athleteEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: classId, athleteName, and athleteEmail are mandatory.'
      });
    }

    const booking = db.createBooking({
      classId,
      athleteName,
      athleteEmail,
      athletePhone,
      experienceLevel
    });

    res.status(201).json({
      success: true,
      message: 'Spot successfully reserved.',
      data: booking
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Query bookings (all or by email)
app.get('/api/bookings', (req, res) => {
  try {
    const { email } = req.query;
    const bookings = db.getBookings(email);
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const cancelled = db.cancelBooking(req.params.id);
    res.json({
      success: true,
      message: 'Reservation cancelled successfully. Spot released.',
      data: cancelled
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// Claim a day trial pass
app.post('/api/day-pass', (req, res) => {
  try {
    const { name, email, phone, trainingFocus } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to issue a day pass.'
      });
    }

    const pass = db.createDayPass({ name, email, phone, trainingFocus });
    res.status(201).json({
      success: true,
      message: 'Guest pass generated successfully.',
      data: pass
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all day passes (admin / staff)
app.get('/api/day-passes', (req, res) => {
  try {
    const passes = db.getDayPasses();
    res.json({ success: true, count: passes.length, data: passes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Trainers roster
app.get('/api/trainers', (req, res) => {
  try {
    const trainers = db.getTrainers();
    res.json({ success: true, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Membership tiers
app.get('/api/memberships', (req, res) => {
  try {
    const tiers = db.getMembershipTiers();
    res.json({ success: true, data: tiers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Member profile & active sessions
app.get('/api/members/me', (req, res) => {
  try {
    const member = db.getMemberProfile();
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add a personal record (PR)
app.post('/api/members/prs', (req, res) => {
  try {
    const { lift, value, verifiedBy } = req.body;
    if (!lift || !value) {
      return res.status(400).json({
        success: false,
        message: 'Lift name and weight/time value are required.'
      });
    }

    const updatedPRs = db.addMemberPR({ lift, value, verifiedBy });
    res.status(201).json({
      success: true,
      message: 'Personal Record logged successfully.',
      data: updatedPRs
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Admin overview & telemetry
app.get('/api/admin/overview', (req, res) => {
  try {
    const overview = db.getAdminOverview();
    res.json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fallback to index.html for client-side navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚡ FORGE & IRON ATHLETIC CLUB (FitG Platform)`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🏋️  Schedule API: http://localhost:${PORT}/api/classes`);
  console.log(`====================================================`);
});
