// EDIT THIS FILE to update club progress, achievements, invitations, and stamps.
// Keep the overall object name as CLUB_DATA.

const CLUB_DATA = {
  club: {
    name: "Oxford-Miami Community Toastmasters",
    year: "2026–2027",
    theme: "Destination: Distinguished",
    tagline: "Many Voices. One Vision. One Journey.",
    website: "https://YOUR-USERNAME.github.io/oxford-miami-success-hub/"
  },

  metrics: [
    {
      icon: "🎯",
      label: "Membership Goal",
      value: "18",
      note: "Goal by June 30"
    },
    {
      icon: "🎓",
      label: "Level 1 Awards",
      value: "1 / 4",
      note: "7 awards projected; update completed count as members finish"
    },
    {
      icon: "🧭",
      label: "Officer Training",
      value: "6 / 4",
      note: "June–August goal exceeded"
    },
    {
      icon: "🗓",
      label: "Renewal Checkpoint",
      value: "Sept. 30",
      note: "Encourage every member to renew by the deadline"
    }
  ],

  education: [
    {
      label: "Level 1 Awards",
      completed: 1,
      goal: 4,
      projected: ["Kim Caudill Mullally", "Ann Littke", "Christopher Owens", "Ricardo Averbach", "Samantha Buchholz", "Susan Peery"]
    },
    {
      label: "Level 2 Awards",
      completed: 0,
      goal: 2,
      projected: ["Ann Littke"]
    },
    {
      label: "Additional Level 2 Awards",
      completed: 0,
      goal: 2,
      projected: ["Kim Caudill Mullally", "Ruchelle A. Dunwoody", "Susan Peery"]
    },
    {
      label: "Level 3 Awards",
      completed: 0,
      goal: 2,
      projected: ["Adam McCoy", "Susan Peery"]
    },
    {
      label: "Level 4 / Path Completion / DTM",
      completed: 0,
      goal: 1,
      projected: ["Chiquita M. Hughes"]
    },
    {
      label: "Additional Level 4 / Path Completion / DTM",
      completed: 0,
      goal: 1,
      projected: ["Margo Kissell"]
    }
  ],

  journey: [
    { icon: "🧳", title: "Pack the Goals", text: "Each member chooses a personal learning and leadership destination." },
    { icon: "🎤", title: "Take the First Step", text: "Help new members complete their introductory speech." },
    { icon: "🗺", title: "Follow Pathways", text: "Complete projects and levels while connecting meeting roles to learning." },
    { icon: "🤝", title: "Bring Someone Along", text: "Invite at least one person to experience our club." },
    { icon: "🏆", title: "Destination: Distinguished", text: "Celebrate the collective results of individual growth." }
  ],

  stamps: [
    { title: "First Flight", subtitle: "Completed first speech", earned: false },
    { title: "On the Move", subtitle: "Completed Level 1", earned: true },
    { title: "Mile High", subtitle: "Completed Level 2", earned: false },
    { title: "Trailblazer", subtitle: "Advanced Pathways milestone", earned: false },
    { title: "Travel Companion", subtitle: "Mentored or encouraged a member", earned: false },
    { title: "Bring a Friend", subtitle: "Brought a guest", earned: false },
    { title: "Full Circle", subtitle: "Completed all meeting roles", earned: false },
    { title: "Passport Renewed", subtitle: "Renewed membership", earned: false }
  ],

  achievements: [
    {
      name: "Kim Caudill Mullally",
      achievement: "Completed a Level 1 Award",
      date: "2026–2027",
      badge: "LEVEL 1"
    }
  ],

  invitations: [
    {
      icon: "🌟",
      title: "Join Oxford-Miami Community Toastmasters",
      subject: "An invitation to Oxford-Miami Community Toastmasters",
      text:
`I would love to invite you to experience Oxford-Miami Community Toastmasters.

Toastmasters provides a supportive place to strengthen communication, public speaking, leadership, and confidence through practice.

Come visit a meeting, meet our members, and see whether the club might be a good fit for your personal or professional goals.

I hope you will join me for an upcoming meeting!`
    },
    {
      icon: "⏰",
      title: "Share an Hour With Me",
      subject: "Share an hour with me at Toastmasters",
      text:
`Would you share an hour with me?

I am part of Oxford-Miami Community Toastmasters, and I would love for you to visit one of our meetings as my guest.

No pressure to join and no preparation required. Just come spend an hour with me, see what we do, and enjoy the experience.

I would be delighted to have you as my guest.`
    }
  ]
};
