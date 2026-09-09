const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'store.json');

const INITIAL_DATA = {
  clubInfo: {
    name: "FORGE & IRON ATHLETIC CLUB",
    tagline: "High-Performance Strength, Olympic Lifting & Contrast Recovery",
    address: "840 Industrial Parkway, Warehouse District, Bldg 4",
    phone: "+1 (555) 840-3674",
    email: "desk@forgeiron.club",
    operatingHours: {
      weekdays: "05:00 - 22:00",
      saturday: "06:30 - 20:00",
      sunday: "08:00 - 18:00"
    },
    currentOccupancy: {
      athletesInside: 46,
      maxCapacity: 65,
      status: "Optimal Flow",
      peakNote: "Peak evening sessions start at 17:30"
    }
  },
  classes: [
    {
      id: "cls-01",
      title: "DAWN PATROL S&C",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Monday",
      time: "06:00 AM - 07:00 AM",
      trainer: "Marcus Vance",
      trainerCert: "CSCS / Olympic Bobsled",
      room: "Vault Platform A",
      capacity: 16,
      bookedCount: 12,
      intensity: "High",
      equipment: ["Eleiko Bars", "Rogue Racks", "Concept2"],
      description: "Heavy barbell compound fundamentals followed by aerobic lactate threshold flushing. Build real capacity before the city wakes up."
    },
    {
      id: "cls-02",
      title: "ENGINE ROOM METCON",
      track: "Metcon & Conditioning",
      category: "metcon",
      day: "Monday",
      time: "07:30 AM - 08:30 AM",
      trainer: "Devon Cole",
      trainerCert: "Hyrox Pro / Golden Gloves",
      room: "The Turf",
      capacity: 18,
      bookedCount: 14,
      intensity: "Extreme",
      equipment: ["Sleds", "SkiErg", "Kettlebells", "Dumbbells"],
      description: "High-density functional intervals. Push heavy sleds, cycle kettlebells, and test your cardiovascular stamina on 50-meter turf."
    },
    {
      id: "cls-03",
      title: "OLYMPIC BARBELL LAB",
      track: "Olympic Weightlifting",
      category: "olympic",
      day: "Monday",
      time: "12:00 PM - 01:15 PM",
      trainer: "Elena Rostova",
      trainerCert: "USAW Senior International / DPT",
      room: "Vault Platform B",
      capacity: 10,
      bookedCount: 8,
      intensity: "Technical",
      equipment: ["Calibrated Eleiko Plates", "Chalk Station", "Video Replay"],
      description: "Precision snatch drills, clean & jerk positions, bar path kinematics, and drop-under speed. Strict technical feedback on every single rep."
    },
    {
      id: "cls-04",
      title: "HEAVY IRON & HYPERTROPHY",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Monday",
      time: "05:30 PM - 06:45 PM",
      trainer: "Marcus Vance",
      trainerCert: "CSCS / Olympic Bobsled",
      room: "Main Floor",
      capacity: 14,
      bookedCount: 11,
      intensity: "High",
      equipment: ["Barbells", "Cables", "Specialty Bars", "Benches"],
      description: "Periodized posterior chain and upper-body mechanical tension work. Focus on maximum motor unit recruitment and structural integrity."
    },
    {
      id: "cls-05",
      title: "BREATHWORK & COLD SANCTUARY",
      track: "Thermal Recovery",
      category: "recovery",
      day: "Monday",
      time: "07:00 PM - 08:00 PM",
      trainer: "Elena Rostova",
      trainerCert: "USAW / DPT / Wim Hof Protocol",
      room: "Recovery Lounge",
      capacity: 12,
      bookedCount: 7,
      intensity: "Restorative",
      equipment: ["38°F Chilled Plunge", "195°F Finnish Sauna", "Breathwork mats"],
      description: "Guided down-regulation breathing, physiological sigh resets, and contrast exposure between 38°F ice baths and cedar dry heat."
    },
    {
      id: "cls-06",
      title: "HYROX ENGINE SIMULATION",
      track: "Hyrox & Endurance",
      category: "metcon",
      day: "Tuesday",
      time: "06:30 AM - 07:45 AM",
      trainer: "Devon Cole",
      trainerCert: "Hyrox Pro / Golden Gloves",
      room: "The Turf & Engine Bay",
      capacity: 16,
      bookedCount: 15,
      intensity: "Extreme",
      equipment: ["Concept2 RowErg", "Sled Push/Pull", "Wall Balls", "Sandbags"],
      description: "Official Hyrox race simulation pacing. Dial in transition times, heart-rate recovery, and movement economy under high metabolic fatigue."
    },
    {
      id: "cls-07",
      title: "FUNCTIONAL MOBILITY & PRE-HAB",
      track: "Mobility & Pre-hab",
      category: "recovery",
      day: "Tuesday",
      time: "08:00 AM - 09:00 AM",
      trainer: "Elena Rostova",
      trainerCert: "Doctor of Physical Therapy",
      room: "Studio 2",
      capacity: 14,
      bookedCount: 6,
      intensity: "Low",
      equipment: ["Resistance Bands", "Foam Rollers", "Lacrosse Balls"],
      description: "Joint capsule mobilization, thoracic extension drills, hip decompression, and active end-range motor control for heavy lifters."
    },
    {
      id: "cls-08",
      title: "DEADLIFT & SQUAT PROTOCOL",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Tuesday",
      time: "05:00 PM - 06:30 PM",
      trainer: "Marcus Vance",
      trainerCert: "CSCS / Olympic Bobsled",
      room: "Vault Platform A",
      capacity: 12,
      bookedCount: 10,
      intensity: "High",
      equipment: ["Competition Calibrated Plates", "Deadlift Jacks", "Power Racks"],
      description: "Deadlift biomechanics, stance optimization, bracing against intra-abdominal pressure, and targeted supplemental lockout work."
    },
    {
      id: "cls-09",
      title: "BOXING CONDITIONING & PADS",
      track: "Combat Conditioning",
      category: "combat",
      day: "Tuesday",
      time: "06:45 PM - 07:45 PM",
      trainer: "Devon Cole",
      trainerCert: "Golden Gloves Finalist",
      room: "Combat Ring",
      capacity: 16,
      bookedCount: 12,
      intensity: "High",
      equipment: ["Leather Heavy Bags", "Speed Bags", "Focus Mitts"],
      description: "Authentic ring craft, hip rotational torque, rhythm footwork drills, and 3-minute high-output rounds with pad holders."
    },
    {
      id: "cls-10",
      title: "DAWN PATROL S&C",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Wednesday",
      time: "06:00 AM - 07:00 AM",
      trainer: "Marcus Vance",
      trainerCert: "CSCS",
      room: "Vault Platform A",
      capacity: 16,
      bookedCount: 13,
      intensity: "High",
      equipment: ["Barbells", "Plyo Boxes", "Concept2"],
      description: "Overhead pressing power, explosive kettlebell transitions, and high-cadence anaerobic intervals."
    },
    {
      id: "cls-11",
      title: "KETTLEBELL MASTERY & CORE",
      track: "Functional Fitness",
      category: "metcon",
      day: "Wednesday",
      time: "12:00 PM - 01:00 PM",
      trainer: "Devon Cole",
      trainerCert: "SFG II Kettlebell Certified",
      room: "The Turf",
      capacity: 14,
      bookedCount: 9,
      intensity: "Medium",
      equipment: ["Competition Kettlebells 12kg-48kg"],
      description: "Hardstyle swings, Turkish get-ups, double kettlebell clean & jerks, and antirotational core strength."
    },
    {
      id: "cls-12",
      title: "CONTRAST PLUNGE & SAUNA",
      track: "Thermal Recovery",
      category: "recovery",
      day: "Wednesday",
      time: "07:30 PM - 08:30 PM",
      trainer: "Elena Rostova",
      trainerCert: "Doctor of Physical Therapy",
      room: "Recovery Lounge",
      capacity: 12,
      bookedCount: 11,
      intensity: "Restorative",
      equipment: ["Cold Plunge", "Sauna", "Electrolyte Bar"],
      description: "Vasoconstriction and vasodilation cycling to clear metabolic byproducts and support parasympathetic nervous recovery."
    },
    {
      id: "cls-13",
      title: "OLYMPIC PULLS & SQUATS",
      track: "Olympic Weightlifting",
      category: "olympic",
      day: "Thursday",
      time: "06:00 AM - 07:15 AM",
      trainer: "Elena Rostova",
      trainerCert: "USAW Senior Coach",
      room: "Vault Platform B",
      capacity: 10,
      bookedCount: 9,
      intensity: "Technical",
      equipment: ["Eleiko Olympic Bars", "Wooden Squat Boxes"],
      description: "High pulls from riser blocks, clean grip deadlifts, and paused front squats to develop leg drive."
    },
    {
      id: "cls-14",
      title: "FULL BODY GRIND METCON",
      track: "Metcon & Conditioning",
      category: "metcon",
      day: "Thursday",
      time: "05:30 PM - 06:30 PM",
      trainer: "Marcus Vance",
      trainerCert: "CSCS",
      room: "The Turf",
      capacity: 18,
      bookedCount: 14,
      intensity: "Extreme",
      equipment: ["Assault Bikes", "Dumbbells", "Sleds"],
      description: "Calorie sprints, dumbbell devils press, and continuous heavy farmer carries under fatigue."
    },
    {
      id: "cls-15",
      title: "TECHNICAL STRIKING & CLINCH",
      track: "Combat Conditioning",
      category: "combat",
      day: "Thursday",
      time: "06:45 PM - 08:00 PM",
      trainer: "Devon Cole",
      trainerCert: "Golden Gloves Finalist",
      room: "Combat Ring",
      capacity: 12,
      bookedCount: 10,
      intensity: "High",
      equipment: ["Thai Pads", "Shin Guards", "Jump Ropes"],
      description: "Range defense, slipping counters, clinch control mechanics, and disciplined sparring combinations."
    },
    {
      id: "cls-16",
      title: "FRIDAY AFTERNOON CLUB LIFT",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Friday",
      time: "04:30 PM - 06:00 PM",
      trainer: "Marcus Vance & Devon Cole",
      trainerCert: "Head Coaches",
      room: "Main Floor",
      capacity: 20,
      bookedCount: 18,
      intensity: "High",
      equipment: ["All Platforms", "Custom Sound System"],
      description: "Community heavy lifting session followed by high-five recovery in the cold tubs. The best way to close the week."
    },
    {
      id: "cls-17",
      title: "SATURDAY WARRIOR HYROX",
      track: "Hyrox & Endurance",
      category: "metcon",
      day: "Saturday",
      time: "08:30 AM - 10:00 AM",
      trainer: "All Coaching Staff",
      trainerCert: "Staff Team",
      room: "Full Facility",
      capacity: 24,
      bookedCount: 22,
      intensity: "Extreme",
      equipment: ["Full Club Roster"],
      description: "Our signature 90-minute weekend test. Team pairs or individual pacing across 8 functional endurance stations."
    },
    {
      id: "cls-18",
      title: "SUNDAY MOBILITY & COLD PLUNGE",
      track: "Thermal Recovery",
      category: "recovery",
      day: "Sunday",
      time: "10:00 AM - 11:30 AM",
      trainer: "Elena Rostova",
      trainerCert: "DPT / Mobility Lead",
      room: "Recovery Lounge",
      capacity: 16,
      bookedCount: 12,
      intensity: "Restorative",
      equipment: ["Sauna", "Plunge", "Bands", "Rollers"],
      description: "Unhurried full body realignment, foam rolling sequences, diaphragmatic breathing, and thermal reset."
    }
  ],
  trainers: [
    {
      id: "trn-01",
      name: "Marcus Vance",
      role: "Head of Strength & Conditioning",
      credentials: "CSCS, USAW L2, Ex-National Bobsled Athlete",
      experience: "14 Years Elite Coaching",
      specialty: "Maximal Strength, Barbell Biomechanics, Periodization",
      bio: "Former competitive athlete dedicated to brutal simplicity: perfecting compound lifts, progressive overload, and building resilient athletes who can produce raw force on demand.",
      quote: "No gimmicks. If you cannot stabilize your spine and move 1.5x your bodyweight smoothly, you have no business doing circus tricks."
    },
    {
      id: "trn-02",
      name: "Elena Rostova",
      role: "Director of Weightlifting & Recovery",
      credentials: "DPT (Doctor of Physical Therapy), USAW Senior Coach",
      experience: "11 Years Clinical & Lifting",
      specialty: "Snatch & Clean Kinematics, Contrast Therapy, Joint Pre-Hab",
      bio: "Elena bridges clinical physical therapy with world-class Olympic weightlifting. She ensures your joints survive heavy loading while elevating barbell speed and recovery throughput.",
      quote: "Strength is meaningless if your nervous system is permanently inflamed. True power demands deliberate recovery."
    },
    {
      id: "trn-03",
      name: "Devon Cole",
      role: "Head of Conditioning & Combat",
      credentials: "Hyrox Elite Tier, Golden Gloves Finalist, SFG II",
      experience: "9 Years High-Performance",
      specialty: "Engine Pacing, Rotational Power, Functional Capacity",
      bio: "Devon constructs aerobic and anaerobic monsters. Whether preparing for Hyrox world competitions or ring warfare, his sessions calibrate mental grit and relentless aerobic efficiency.",
      quote: "Your mind quits at 40% of actual physical capability. We train the remaining 60% with composure."
    }
  ],
  membershipTiers: [
    {
      id: "tier-day",
      name: "DAY PASS",
      type: "dropin",
      priceMonthly: 35,
      priceAnnual: 35,
      billingNote: "Single Day Access",
      badge: "Open Drop-In",
      description: "Full day access to gym floor, Olympic platforms, locker room, and cold plunge.",
      perks: [
        "Full facility access for 24 hours",
        "Eleiko platform & chalk station use",
        "Cold plunge & Finnish cedar sauna",
        "Locker & rainfall shower amenities",
        "Towel service included"
      ]
    },
    {
      id: "tier-standard",
      name: "THE STANDARD",
      type: "membership",
      priceMonthly: 149,
      priceAnnual: 125,
      billingNote: "per month, billed annually or monthly",
      badge: "Most Popular",
      description: "Unrestricted open floor training, premium locker amenities, and 4 group classes/month.",
      perks: [
        "24/7 keycard club access",
        "Unrestricted open floor & turf training",
        "4 coached group classes included per month",
        "Full recovery lounge access (Sauna + Plunge)",
        "Member app & workout telemetry logging",
        "1 monthly guest drop-in pass"
      ]
    },
    {
      id: "tier-black",
      name: "BLACK LABEL PERFORMANCE",
      type: "membership",
      priceMonthly: 235,
      priceAnnual: 195,
      billingNote: "per month, billed annually or monthly",
      badge: "All-Inclusive Elite",
      description: "Unlimited coached classes, dedicated coaching consults, quarterly DEXA, and VIP lounge.",
      perks: [
        "Unlimited access to ALL classes (S&C, Hyrox, Olympic, Combat)",
        "Priority reservation window (14 days in advance)",
        "Quarterly 3D body composition & DEXA scan",
        "Monthly 1-on-1 coach technique review (45 min)",
        "Permanent personal kit locker & laundry wash service",
        "Unlimited guest passes (1 friend per session)",
        "Complimentary high-performance fuel bar shakes"
      ]
    }
  ],
  memberProfile: {
    id: "MBR-9041",
    name: "Alexander Reed",
    email: "alex.reed@forgeiron.club",
    phone: "+1 (555) 234-8891",
    membershipTier: "Black Label Performance",
    memberSince: "November 2024",
    status: "Active Member",
    qrCodeString: "FORGE-MBR-9041-SECURE-ACCESS",
    attendanceStreak: 19,
    monthlyWorkouts: 21,
    personalRecords: [
      { id: "pr-1", lift: "Conventional Deadlift", value: "495 lbs", date: "2026-08-14", verifiedBy: "Marcus Vance" },
      { id: "pr-2", lift: "Low Bar Back Squat", value: "405 lbs", date: "2026-08-28", verifiedBy: "Marcus Vance" },
      { id: "pr-3", lift: "Clean & Jerk", value: "275 lbs", date: "2026-07-20", verifiedBy: "Elena Rostova" },
      { id: "pr-4", lift: "Barbell Bench Press", value: "315 lbs", date: "2026-09-02", verifiedBy: "Marcus Vance" },
      { id: "pr-5", lift: "500m Concept2 Row", value: "1:22.4", date: "2026-08-05", verifiedBy: "Devon Cole" }
    ]
  },
  bookings: [
    {
      id: "FRG-8491",
      classId: "cls-01",
      className: "DAWN PATROL S&C",
      classTime: "06:00 AM - 07:00 AM",
      classDay: "Monday",
      athleteName: "Alexander Reed",
      athleteEmail: "alex.reed@forgeiron.club",
      athletePhone: "+1 (555) 234-8891",
      experienceLevel: "Advanced",
      room: "Vault Platform A",
      trainer: "Marcus Vance",
      bookedAt: "2026-09-08T19:30:00.000Z",
      status: "confirmed"
    },
    {
      id: "FRG-8492",
      classId: "cls-05",
      className: "BREATHWORK & COLD SANCTUARY",
      classTime: "07:00 PM - 08:00 PM",
      classDay: "Monday",
      athleteName: "Alexander Reed",
      athleteEmail: "alex.reed@forgeiron.club",
      athletePhone: "+1 (555) 234-8891",
      experienceLevel: "Intermediate",
      room: "Recovery Lounge",
      trainer: "Elena Rostova",
      bookedAt: "2026-09-08T20:15:00.000Z",
      status: "confirmed"
    },
    {
      id: "FRG-8501",
      classId: "cls-06",
      className: "HYROX ENGINE SIMULATION",
      classTime: "06:30 AM - 07:45 AM",
      classDay: "Tuesday",
      athleteName: "Sarah Jenkins",
      athleteEmail: "s.jenkins@metcon.org",
      athletePhone: "+1 (555) 301-4452",
      experienceLevel: "Advanced",
      room: "The Turf & Engine Bay",
      trainer: "Devon Cole",
      bookedAt: "2026-09-07T14:10:00.000Z",
      status: "confirmed"
    }
  ],
  dayPasses: [
    {
      id: "PASS-7102",
      name: "Jordan Hayes",
      email: "jordan.h@gmail.com",
      phone: "+1 (555) 492-1100",
      trainingFocus: "Olympic Weightlifting",
      passCode: "PASS-7102-FRG",
      issuedAt: "2026-09-08T11:00:00.000Z",
      expiresAt: "2026-09-15T23:59:59.000Z",
      status: "active"
    }
  ]
};

class Database {
  constructor() {
    this.ensureInitialized();
  }

  ensureInitialized() {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      this.writeStore(INITIAL_DATA);
    }
  }

  readStore() {
    try {
      this.ensureInitialized();
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading data store, resetting to initial data:', err);
      this.writeStore(INITIAL_DATA);
      return INITIAL_DATA;
    }
  }

  writeStore(data) {
    const tempFile = `${DATA_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, DATA_FILE);
  }

  getClubInfo() {
    const data = this.readStore();
    return data.clubInfo;
  }

  getClasses(day, category) {
    const data = this.readStore();
    let filtered = [...data.classes];

    if (day && day !== 'all') {
      filtered = filtered.filter(c => c.day.toLowerCase() === day.toLowerCase());
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    return filtered.map(c => ({
      ...c,
      spotsRemaining: Math.max(0, c.capacity - (c.bookedCount || 0)),
      isFull: (c.bookedCount || 0) >= c.capacity
    }));
  }

  getClassById(classId) {
    const data = this.readStore();
    const found = data.classes.find(c => c.id === classId);
    if (!found) return null;
    return {
      ...found,
      spotsRemaining: Math.max(0, found.capacity - (found.bookedCount || 0)),
      isFull: (found.bookedCount || 0) >= found.capacity
    };
  }

  createBooking({ classId, athleteName, athleteEmail, athletePhone, experienceLevel }) {
    const data = this.readStore();
    const targetClass = data.classes.find(c => c.id === classId);

    if (!targetClass) {
      throw new Error('Class session not found');
    }

    if ((targetClass.bookedCount || 0) >= targetClass.capacity) {
      throw new Error('Class is fully booked. Spot reservation unavailable.');
    }

    // Check existing booking for same email in same class
    const existing = data.bookings.find(
      b => b.classId === classId && b.athleteEmail.toLowerCase() === athleteEmail.toLowerCase() && b.status === 'confirmed'
    );
    if (existing) {
      throw new Error('You already hold a confirmed reservation for this session.');
    }

    const bookingId = `FRG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingId,
      classId: targetClass.id,
      className: targetClass.title,
      classTime: targetClass.time,
      classDay: targetClass.day,
      athleteName: athleteName.trim(),
      athleteEmail: athleteEmail.trim().toLowerCase(),
      athletePhone: athletePhone ? athletePhone.trim() : '',
      experienceLevel: experienceLevel || 'Intermediate',
      room: targetClass.room,
      trainer: targetClass.trainer,
      bookedAt: new Date().toISOString(),
      status: 'confirmed'
    };

    targetClass.bookedCount = (targetClass.bookedCount || 0) + 1;
    data.bookings.unshift(newBooking);

    this.writeStore(data);
    return newBooking;
  }

  cancelBooking(bookingId) {
    const data = this.readStore();
    const bookingIndex = data.bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
      throw new Error('Booking reference not found');
    }

    const booking = data.bookings[bookingIndex];
    if (booking.status === 'cancelled') {
      return booking;
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date().toISOString();

    const targetClass = data.classes.find(c => c.id === booking.classId);
    if (targetClass && targetClass.bookedCount > 0) {
      targetClass.bookedCount -= 1;
    }

    this.writeStore(data);
    return booking;
  }

  getBookings(email) {
    const data = this.readStore();
    if (email) {
      return data.bookings.filter(b => b.athleteEmail.toLowerCase() === email.toLowerCase());
    }
    return data.bookings;
  }

  createDayPass({ name, email, phone, trainingFocus }) {
    const data = this.readStore();
    const passCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}-FRG`;
    
    const now = new Date();
    const expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newPass = {
      id: `dp-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      trainingFocus: trainingFocus || 'General Strength',
      passCode: passCode,
      issuedAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      status: 'active'
    };

    data.dayPasses.unshift(newPass);
    this.writeStore(data);
    return newPass;
  }

  getDayPasses() {
    const data = this.readStore();
    return data.dayPasses;
  }

  getTrainers() {
    const data = this.readStore();
    return data.trainers;
  }

  getMembershipTiers() {
    const data = this.readStore();
    return data.membershipTiers;
  }

  getMemberProfile() {
    const data = this.readStore();
    const profile = data.memberProfile;
    // Attach active user bookings
    const activeBookings = data.bookings.filter(
      b => b.athleteEmail.toLowerCase() === profile.email.toLowerCase() && b.status === 'confirmed'
    );
    return {
      ...profile,
      activeBookings
    };
  }

  addMemberPR({ lift, value, verifiedBy }) {
    const data = this.readStore();
    const newPR = {
      id: `pr-${Date.now()}`,
      lift: lift.trim(),
      value: value.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedBy: verifiedBy || 'Staff Coach'
    };

    data.memberProfile.personalRecords.unshift(newPR);
    this.writeStore(data);
    return data.memberProfile.personalRecords;
  }

  getAdminOverview() {
    const data = this.readStore();
    const totalBookings = data.bookings.filter(b => b.status === 'confirmed').length;
    const totalDayPasses = data.dayPasses.length;
    const totalSpots = data.classes.reduce((acc, c) => acc + c.capacity, 0);
    const bookedSpots = data.classes.reduce((acc, c) => acc + (c.bookedCount || 0), 0);

    return {
      clubInfo: data.clubInfo,
      stats: {
        totalBookings,
        totalDayPasses,
        totalClasses: data.classes.length,
        overallCapacityUtilization: `${Math.round((bookedSpots / totalSpots) * 100)}%`,
        activeAthletesOnFloor: data.clubInfo.currentOccupancy.athletesInside,
        maxCapacity: data.clubInfo.currentOccupancy.maxCapacity
      },
      recentBookings: data.bookings.slice(0, 10),
      recentDayPasses: data.dayPasses.slice(0, 10)
    };
  }
}

module.exports = new Database();
