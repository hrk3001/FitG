const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'store.json');

const INITIAL_DATA = {
  clubInfo: {
    name: "FITG FITNESS STUDIO // COIMBATORE",
    tagline: "Kovai's Premier Strength, Transformation & Cross-Training Hub",
    branches: [
      "Peelamedu (Avinashi Road - Main Branch)",
      "RS Puram (DB Road)",
      "Saravanampatti (Near Tidel Park / CHIL SEZ)"
    ],
    address: "42/1 Avinashi Road, Near Nava India Signal, Peelamedu, Coimbatore - 641004",
    phone: "+91 98422 41008 / +91 (422) 257-4100",
    email: "kovai@fitgfitness.in",
    operatingHours: {
      weekdays: "05:30 AM - 10:00 PM",
      saturday: "05:30 AM - 09:30 PM",
      sunday: "06:00 AM - 01:00 PM",
      ladiesBatch: "10:00 AM - 11:30 AM (Exclusive Ladies Hours)"
    },
    currentOccupancy: {
      athletesInside: 38,
      maxCapacity: 55,
      status: "Smooth Flow",
      peakNote: "Evening rush from Peelamedu colleges & IT folks begins at 06:30 PM"
    }
  },
  classes: [
    {
      id: "cls-01",
      title: "EARLY BIRD STRENGTH & CONDITIONING",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Monday",
      time: "06:00 AM - 07:00 AM",
      trainer: "Karthik Raja",
      trainerCert: "K11 Master Trainer",
      room: "Main Strength Floor",
      capacity: 18,
      bookedCount: 14,
      intensity: "High",
      equipment: ["Jerai Barbells", "Power Racks", "Dumbbells"],
      description: "Compound barbell fundamentals, squats, and functional strength. Start your morning before the Avinashi Road traffic starts."
    },
    {
      id: "cls-02",
      title: "HIIT FAT BURN & CARDIO CIRCUIT",
      track: "Weight Loss & Cardio",
      category: "metcon",
      day: "Monday",
      time: "07:15 AM - 08:15 AM",
      trainer: "Vigneshwaran 'Vicky'",
      trainerCert: "ACSM Certified",
      room: "Cardio & Turf Zone",
      capacity: 20,
      bookedCount: 16,
      intensity: "High",
      equipment: ["Battle Ropes", "Air Bikes", "Kettlebells"],
      description: "High calorie-burn metabolic circuit designed for steady fat loss and cardiovascular stamina."
    },
    {
      id: "cls-03",
      title: "DEDICATED LADIES FITNESS BATCH",
      track: "Women Fitness & Toning",
      category: "women",
      day: "Monday",
      time: "10:00 AM - 11:30 AM",
      trainer: "Priya S.",
      trainerCert: "Postpartum & PCOS Specialist",
      room: "Full Studio Floor",
      capacity: 15,
      bookedCount: 11,
      intensity: "Moderate",
      equipment: ["Dumbbells", "Resistance Bands", "Core Mats"],
      description: "Dedicated exclusive ladies batch with female certified coach. Posture, core strengthening, inch loss, and functional mobility."
    },
    {
      id: "cls-04",
      title: "HEAVY IRON & HYPERTROPHY",
      track: "Bodybuilding & Muscle",
      category: "strength",
      day: "Monday",
      time: "05:30 PM - 06:45 PM",
      trainer: "Karthik Raja",
      trainerCert: "K11 Master Trainer",
      room: "Main Strength Floor",
      capacity: 16,
      bookedCount: 13,
      intensity: "High",
      equipment: ["Cables", "Incline Benches", "Heavy Dumbbells up to 50kg"],
      description: "Progressive overload chest, back, and arm hypertrophy splits with strict form guidance."
    },
    {
      id: "cls-05",
      title: "CROSSFIT & BATTLE ROPE BOOTCAMP",
      track: "Cross-Training",
      category: "metcon",
      day: "Monday",
      time: "07:00 PM - 08:00 PM",
      trainer: "Vigneshwaran 'Vicky'",
      trainerCert: "State Powerlifter",
      room: "Turf Zone",
      capacity: 18,
      bookedCount: 15,
      intensity: "Extreme",
      equipment: ["Heavy Ropes", "Plyo Boxes", "Tire Flips", "Slam Balls"],
      description: "Slam-style explosive functional workout with heavy battle ropes, box jumps, and tire flips to Kollywood bass tracks."
    },
    {
      id: "cls-06",
      title: "POWER YOGA & DEEP STRETCH",
      track: "Mobility & Recovery",
      category: "recovery",
      day: "Tuesday",
      time: "06:30 AM - 07:30 AM",
      trainer: "Priya S.",
      trainerCert: "Certified Yoga & Mobility Lead",
      room: "Studio 2",
      capacity: 16,
      bookedCount: 8,
      intensity: "Low",
      equipment: ["Yoga Mats", "Foam Rollers", "Blocks"],
      description: "Active spinal decompression, hamstring length, and breathing control to soothe desk fatigue."
    },
    {
      id: "cls-07",
      title: "CORE CRUSHER & ABS ACCELERATOR",
      track: "Core & Conditioning",
      category: "strength",
      day: "Tuesday",
      time: "07:45 AM - 08:30 AM",
      trainer: "Vigneshwaran 'Vicky'",
      trainerCert: "ACSM Certified",
      room: "Turf Zone",
      capacity: 16,
      bookedCount: 12,
      intensity: "High",
      equipment: ["Ab Rollers", "Hanging Leg Raise Bar", "Medicine Balls"],
      description: "Targeted abdominal conditioning, oblique twists, and isometric core stabilization."
    },
    {
      id: "cls-08",
      title: "LADIES STRENGTH & INCH LOSS",
      track: "Women Fitness & Toning",
      category: "women",
      day: "Tuesday",
      time: "10:00 AM - 11:30 AM",
      trainer: "Priya S.",
      trainerCert: "Female Fitness Lead",
      room: "Full Studio Floor",
      capacity: 15,
      bookedCount: 9,
      intensity: "Moderate",
      equipment: ["Light Barbells", "Kettlebells", "Glute Bands"],
      description: "Glute strengthening, lower body conditioning, and heart-healthy circuits in a supportive environment."
    },
    {
      id: "cls-09",
      title: "LEG DAY DESTRUCTION",
      track: "Strength & Bodybuilding",
      category: "strength",
      day: "Tuesday",
      time: "05:30 PM - 06:45 PM",
      trainer: "Karthik Raja",
      trainerCert: "K11 Master Trainer",
      room: "Main Strength Floor",
      capacity: 14,
      bookedCount: 12,
      intensity: "Extreme",
      equipment: ["Hack Squat", "Leg Press 45°", "Smith Machine"],
      description: "Heavy quad, hamstring, and calf work. Quad sweeps and hamstring curls under strict tempo control."
    },
    {
      id: "cls-10",
      title: "KICKBOXING & STRIKING CARDIO",
      track: "Combat Conditioning",
      category: "combat",
      day: "Tuesday",
      time: "07:00 PM - 08:00 PM",
      trainer: "Vigneshwaran 'Vicky'",
      trainerCert: "Combat Certified",
      room: "Combat Pad Area",
      capacity: 16,
      bookedCount: 13,
      intensity: "High",
      equipment: ["Focus Pads", "Heavy Punching Bags", "Hand Wraps"],
      description: "Basic boxing combos, knee strikes, kick defense, and sweat-drenching bag work."
    },
    {
      id: "cls-11",
      title: "EARLY BIRD STRENGTH & CONDITIONING",
      track: "Strength & Conditioning",
      category: "strength",
      day: "Wednesday",
      time: "06:00 AM - 07:00 AM",
      trainer: "Karthik Raja",
      trainerCert: "K11 Master Trainer",
      room: "Main Strength Floor",
      capacity: 18,
      bookedCount: 14,
      intensity: "High",
      equipment: ["Jerai Barbells", "Dumbbells"],
      description: "Overhead military pressing, bent-over barbell rows, and functional stamina."
    },
    {
      id: "cls-12",
      title: "TABATA STEP & FAT BURN",
      track: "Weight Loss & Cardio",
      category: "metcon",
      day: "Wednesday",
      time: "07:30 AM - 08:30 AM",
      trainer: "Priya S.",
      trainerCert: "ACSM Certified",
      room: "Cardio Floor",
      capacity: 18,
      bookedCount: 13,
      intensity: "High",
      equipment: ["Aerobic Steps", "Light Dumbbells"],
      description: "20 seconds maximum effort, 10 seconds rest. Fast-paced music and full body sweat."
    },
    {
      id: "cls-13",
      title: "CHEST & BICEPS PUMP GRIND",
      track: "Bodybuilding & Muscle",
      category: "strength",
      day: "Wednesday",
      time: "05:30 PM - 06:45 PM",
      trainer: "Karthik Raja",
      trainerCert: "K11 Master Trainer",
      room: "Main Strength Floor",
      capacity: 16,
      bookedCount: 14,
      intensity: "High",
      equipment: ["Flat & Incline Benches", "Cable Crossover"],
      description: "The classic Wednesday evening chest and arm session with proper spotter support."
    },
    {
      id: "cls-14",
      title: "STEAM BATH & RECOVERY EVENING",
      track: "Mobility & Recovery",
      category: "recovery",
      day: "Wednesday",
      time: "07:30 PM - 08:30 PM",
      trainer: "Staff Assisted",
      trainerCert: "Wellness Staff",
      room: "Steam Room & Shower Suite",
      capacity: 12,
      bookedCount: 10,
      intensity: "Restorative",
      equipment: ["Aromatic Eucalyptus Steam Room", "Hot Showers"],
      description: "Detoxify tired muscles, open pores, and unwind after an intense week of lifting."
    },
    {
      id: "cls-15",
      title: "KOVAI WARRIORS WEEKEND BOOTCAMP",
      track: "Cross-Training",
      category: "metcon",
      day: "Saturday",
      time: "07:00 AM - 08:30 AM",
      trainer: "All Coaches (Karthik & Vicky)",
      trainerCert: "Full Coaching Staff",
      room: "Full Facility & Turf",
      capacity: 25,
      bookedCount: 22,
      intensity: "Extreme",
      equipment: ["Entire Gym Setup"],
      description: "Our signature high-energy 90-minute weekend circuit. Partner workouts, battle rope relays, and protein shake social."
    },
    {
      id: "cls-16",
      title: "SUNDAY OPEN FLOOR & STEAM RELAX",
      track: "Mobility & Recovery",
      category: "recovery",
      day: "Sunday",
      time: "08:00 AM - 11:00 AM",
      trainer: "Duty Trainer",
      trainerCert: "On-Floor Support",
      room: "Strength Floor & Steam Suite",
      capacity: 20,
      bookedCount: 11,
      intensity: "Moderate",
      equipment: ["Open Floor", "Steam Bath"],
      description: "Easy workout Sunday: hit lagging muscle groups at your own pace, foam roll, and enjoy our hot steam room."
    }
  ],
  trainers: [
    {
      id: "trn-01",
      name: "Coach Karthik Raja",
      role: "Head Coach & Transformation Specialist",
      credentials: "K11 Certified, Master Personal Trainer",
      experience: "10+ Years in Coimbatore Fitness Scene",
      specialty: "Hypertrophy, Natural Bodybuilding, South Indian Diet Charts",
      bio: "Karthik has coached over 800+ college students, business owners, and IT professionals in Coimbatore. Believes in strict form, clean local food habits, and no-nonsense consistency.",
      quote: "You don't need fancy foreign diets. Rice, eggs, dal, and heavy progressive lifting builds championship physiques."
    },
    {
      id: "trn-02",
      name: "Coach Vigneshwaran 'Vicky'",
      role: "Senior Strength & Functional Lead",
      credentials: "ACSM Certified, State Powerlifting Medalist",
      experience: "7 Years High-Energy Coaching",
      specialty: "Battle Ropes, Fat Loss Circuits, Strength Conditioning",
      bio: "Vicky brings electrifying Slam-style energy to every batch. If you need that extra push when you feel like quitting on the 10th rep, Vicky is the voice in your corner.",
      quote: "Pain today is pride tomorrow. Give your 100% on the floor!"
    },
    {
      id: "trn-03",
      name: "Coach Priya S.",
      role: "Women's Fitness Lead & Clinical Nutritionist",
      credentials: "Certified Female Fitness Specialist, MSc Clinical Nutrition",
      experience: "8 Years Fitness & Diet Planning",
      specialty: "Postpartum Recovery, PCOS / Thyroid Management, Inch Loss",
      bio: "Priya leads our exclusive 10:00 AM ladies batch and customizes sustainable nutrition plans for women balancing work, home, and health.",
      quote: "Fitness isn't about looking like someone else. It's about feeling confident, pain-free, and strong every single day."
    }
  ],
  membershipTiers: [
    {
      id: "tier-day",
      name: "1-DAY GUEST PASS",
      type: "dropin",
      priceMonthly: 350,
      priceAnnual: 350,
      currencySymbol: "₹",
      billingNote: "One-Time Drop-in",
      badge: "Try Before Joining",
      description: "Full day pass to workout on our floor, use cardio machines, lockers, and hot steam room.",
      perks: [
        "Full gym floor & cardio theater access",
        "Free weights up to 50kg dumbbells",
        "Hot eucalyptus steam bath & shower",
        "RO cold drinking water facility",
        "Free two-wheeler / car parking"
      ]
    },
    {
      id: "tier-quarterly",
      name: "3 MONTHS (QUARTERLY)",
      type: "membership",
      priceMonthly: 6999,
      priceAnnual: 6999,
      currencySymbol: "₹",
      billingNote: "₹2,333 / month (Quarterly Package)",
      badge: "Student & IT Favorite",
      description: "Most popular tier for PSG, CIT college students and IT professionals in Peelamedu & Saravanampatti.",
      perks: [
        "Unrestricted access during all operating hours",
        "Personalized body composition (BCA) test",
        "Customized Tamil / Indian workout & diet chart",
        "Access to daily group HIIT & Cross-Training batches",
        "Weekly hot steam bath session",
        "Free locker storage during workout"
      ]
    },
    {
      id: "tier-annual",
      name: "1 YEAR ANNUAL VIP",
      type: "membership",
      priceMonthly: 15499,
      priceAnnual: 12999,
      currencySymbol: "₹",
      billingNote: "Just ~₹1,083 / month (Best Value)",
      badge: "Maximum Savings",
      description: "Complete 12-month transformation membership with full perks, steam bath, and trainer consults.",
      perks: [
        "Full 365 days multi-branch access (Peelamedu, RS Puram, Saravanampatti)",
        "FREE 6 Personal Training sessions with senior coach",
        "Unlimited steam bath & shower privileges",
        "Monthly diet review & body fat measurement",
        "Complimentary FitG Gym Duffel Bag & Shaker Bottle",
        "3 Free Guest Passes for friends or family",
        "Option to freeze membership up to 30 days"
      ]
    }
  ],
  memberProfile: {
    id: "FITG-KOV-2041",
    name: "Arun Kumar",
    email: "arun.kumar@gmail.com",
    phone: "+91 98421 90214",
    branch: "Peelamedu Main (Avinashi Rd)",
    membershipTier: "1 Year Annual VIP",
    memberSince: "August 2024",
    status: "Active Member",
    qrCodeString: "FITG-KOV-2041-PEELAMEDU",
    attendanceStreak: 24,
    monthlyWorkouts: 22,
    transformationProgress: "-8.5 kg lost // +3.2 kg lean muscle gained",
    personalRecords: [
      { id: "pr-1", lift: "Conventional Deadlift", value: "180 kg", date: "2026-08-20", verifiedBy: "Coach Karthik Raja" },
      { id: "pr-2", lift: "Barbell Squat", value: "145 kg", date: "2026-09-01", verifiedBy: "Coach Karthik Raja" },
      { id: "pr-3", lift: "Flat Barbell Bench Press", value: "110 kg", date: "2026-08-15", verifiedBy: "Coach Vicky" },
      { id: "pr-4", lift: "Dumbbell Incline Press", value: "34 kg each", date: "2026-09-04", verifiedBy: "Coach Karthik Raja" },
      { id: "pr-5", lift: "Weighted Plank Hold", value: "3 min 45 sec", date: "2026-08-28", verifiedBy: "Coach Priya S." }
    ]
  },
  bookings: [
    {
      id: "FRG-5101",
      classId: "cls-01",
      className: "EARLY BIRD STRENGTH & CONDITIONING",
      classTime: "06:00 AM - 07:00 AM",
      classDay: "Monday",
      athleteName: "Arun Kumar",
      athleteEmail: "arun.kumar@gmail.com",
      athletePhone: "+91 98421 90214",
      experienceLevel: "Intermediate",
      room: "Main Strength Floor",
      trainer: "Karthik Raja",
      bookedAt: "2026-09-08T19:30:00.000Z",
      status: "confirmed"
    },
    {
      id: "FRG-5102",
      classId: "cls-05",
      className: "CROSSFIT & BATTLE ROPE BOOTCAMP",
      classTime: "07:00 PM - 08:00 PM",
      classDay: "Monday",
      athleteName: "Arun Kumar",
      athleteEmail: "arun.kumar@gmail.com",
      athletePhone: "+91 98421 90214",
      experienceLevel: "Intermediate",
      room: "Turf Zone",
      trainer: "Vigneshwaran 'Vicky'",
      bookedAt: "2026-09-08T20:15:00.000Z",
      status: "confirmed"
    },
    {
      id: "FRG-5103",
      classId: "cls-03",
      className: "DEDICATED LADIES FITNESS BATCH",
      classTime: "10:00 AM - 11:30 AM",
      classDay: "Tuesday",
      athleteName: "Deepa Nandhini",
      athleteEmail: "deepa.n@gmail.com",
      athletePhone: "+91 97890 12345",
      experienceLevel: "Beginner",
      room: "Full Studio Floor",
      trainer: "Priya S.",
      bookedAt: "2026-09-08T11:20:00.000Z",
      status: "confirmed"
    }
  ],
  dayPasses: [
    {
      id: "PASS-3012",
      name: "Suresh Balaji",
      email: "suresh.b@outlook.com",
      phone: "+91 99441 55678",
      trainingFocus: "Weight Training & Steam",
      passCode: "PASS-3012-KOVAI",
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
    // Always write fresh updated initial data when requested
    this.writeStore(INITIAL_DATA);
  }

  readStore() {
    try {
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
      throw new Error('Class batch session not found');
    }

    if ((targetClass.bookedCount || 0) >= targetClass.capacity) {
      throw new Error('Batch is full. Please choose another batch or time slot.');
    }

    const existing = data.bookings.find(
      b => b.classId === classId && b.athleteEmail.toLowerCase() === athleteEmail.toLowerCase() && b.status === 'confirmed'
    );
    if (existing) {
      throw new Error('You have already reserved a slot in this batch.');
    }

    const bookingId = `KOV-${Math.floor(1000 + Math.random() * 9000)}`;
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
    const passCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}-KOVAI`;
    
    const now = new Date();
    const expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newPass = {
      id: `dp-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      trainingFocus: trainingFocus || 'General Fitness',
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
      verifiedBy: verifiedBy || 'Duty Coach'
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
