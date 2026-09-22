(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  // ---------- Dashboard ----------
  function renderMetrics() {
    const wrap = $("#metricCards");
    wrap.innerHTML = CLUB_DATA.metrics.map(m => `
      <article class="metric-card">
        <div class="metric-icon">${m.icon}</div>
        <div class="metric-label">${m.label}</div>
        <div class="metric-value">${m.value}</div>
        <div class="metric-note">${m.note}</div>
      </article>
    `).join("");
  }

  function renderEducation() {
    const totalCompleted = CLUB_DATA.education.reduce((n, x) => n + x.completed, 0);
    const totalGoal = CLUB_DATA.education.reduce((n, x) => n + x.goal, 0);
    $("#educationSummary").textContent = `${totalCompleted} of ${totalGoal} goal awards recorded`;

    $("#educationProgress").innerHTML = CLUB_DATA.education.map(item => {
      const pct = Math.min(100, Math.round((item.completed / item.goal) * 100));
      const projected = item.projected?.length ? `Projected: ${item.projected.join(", ")}` : "No projection entered";
      return `
        <div class="progress-row">
          <div class="progress-label">
            <strong>${item.label}</strong>
            <small>${projected}</small>
          </div>
          <div class="progress-track" aria-label="${item.label}: ${item.completed} of ${item.goal}">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
          <div class="progress-number">${item.completed}/${item.goal}</div>
        </div>
      `;
    }).join("");
  }

  // ---------- Journey ----------
  function renderJourney() {
    $("#journeyTrack").innerHTML = CLUB_DATA.journey.map(stop => `
      <article class="journey-stop">
        <div class="stop-marker">${stop.icon}</div>
        <div>
          <h3>${stop.title}</h3>
          <p>${stop.text}</p>
        </div>
      </article>
    `).join("");
  }

  // ---------- Passport ----------
  function renderStamps() {
    $("#stampGrid").innerHTML = CLUB_DATA.stamps.map(stamp => `
      <article class="stamp-card ${stamp.earned ? "" : "locked"}">
        <div>
          <div class="stamp-art">${stamp.title}</div>
          <h3>${stamp.title}</h3>
          <p>${stamp.subtitle}</p>
        </div>
        <p><strong>${stamp.earned ? "STAMPED ✓" : "Next stop…"}</strong></p>
      </article>
    `).join("");
  }

  // ---------- Brag Board ----------
  function renderBragBoard() {
    const wrap = $("#bragGrid");
    if (!CLUB_DATA.achievements.length) {
      wrap.innerHTML = `<p>No achievements entered yet. Add one in <code>club-data.js</code>.</p>`;
      return;
    }
    wrap.innerHTML = CLUB_DATA.achievements.map(a => `
      <article class="brag-card">
        <div class="brag-top">
          <span class="brag-badge">${a.badge}</span>
          <span class="brag-date">${a.date}</span>
        </div>
        <h3>${a.name}</h3>
        <p>${a.achievement}</p>
        <p class="tiny">Destination: Distinguished · Many Voices. One Vision. One Journey.</p>
      </article>
    `).join("");
  }

  function latestAchievement() {
    return CLUB_DATA.achievements[CLUB_DATA.achievements.length - 1] || {
      name: "Oxford-Miami Toastmasters",
      achievement: "Another milestone on the journey!",
      badge: "CELEBRATE",
      date: CLUB_DATA.club.year
    };
  }

  // ---------- Invitations ----------
  function renderInvitations() {
    $("#invitationGrid").innerHTML = CLUB_DATA.invitations.map((inv, idx) => `
      <article class="invite-card">
        <div class="invite-banner">
          <div class="invite-icon">${inv.icon}</div>
          <h3>${inv.title}</h3>
        </div>
        <div class="invite-body">
          <div class="invite-copy" id="inviteText${idx}">${inv.text}</div>
          <div class="invite-actions">
            <button class="button primary small" data-copy="${idx}">📋 Copy</button>
            <button class="button outline small" data-email="${idx}">✉ Email</button>
            <button class="button outline small" data-share="${idx}">↗ Share</button>
            <button class="button outline small" data-download="${idx}">⬇ Download PNG</button>
          </div>
        </div>
      </article>
    `).join("");

    $$("[data-copy]").forEach(btn => btn.addEventListener("click", () => copyInvitation(+btn.dataset.copy)));
    $$("[data-email]").forEach(btn => btn.addEventListener("click", () => emailInvitation(+btn.dataset.email)));
    $$("[data-share]").forEach(btn => btn.addEventListener("click", () => shareInvitation(+btn.dataset.share)));
    $$("[data-download]").forEach(btn => btn.addEventListener("click", () => downloadInvitation(+btn.dataset.download)));
  }

  // ---------- Download a shareable invitation graphic ----------
  // Generates an image from the current invitation text in club-data.js.
  // Your meeting location and Zoom details will be included if they are in that text.
  function invitationLines(context, text, maxWidth) {
    const lines = [];
    for (const paragraph of text.replace(/\r/g, "").split("\n")) {
      if (!paragraph.trim()) {
        lines.push("");
        continue;
      }
      let line = "";
      for (const word of paragraph.trim().split(/\s+/)) {
        const proposed = line ? `${line} ${word}` : word;
        if (line && context.measureText(proposed).width > maxWidth) {
          lines.push(line);
          line = word;
        } else {
          line = proposed;
        }
      }
      if (line) lines.push(line);
    }
    return lines;
  }

  function downloadInvitation(i) {
    const invitation = CLUB_DATA.invitations[i];
    if (!invitation) return;

    const canvas = document.createElement("canvas");
    const width = 1600;
    const left = 130;
    const maxTextWidth = width - left * 2;
    const context = canvas.getContext("2d");

    // Measure the CURRENT invitation wording first, so long messages
    // extend the image rather than being clipped at the bottom.
    const headingFont = 72;
    context.font = `bold ${headingFont}px Arial, sans-serif`;
    const headingLines = invitationLines(context, invitation.title, maxTextWidth);
    const bodyTop = 535 + headingLines.length * 88;
    let bodyFont = 43;
    context.font = `${bodyFont}px Arial, sans-serif`;
    let bodyLines = invitationLines(context, invitation.text, maxTextWidth);
    let bodyLineHeight = bodyFont * 1.45;
    const bodyHeight = () => bodyLines.reduce(
      (total, line) => total + (line ? bodyLineHeight : bodyLineHeight * 0.6), 0
    );
    while (bodyHeight() > 1070 && bodyFont > 32) {
      bodyFont -= 2;
      bodyLineHeight = bodyFont * 1.45;
      context.font = `${bodyFont}px Arial, sans-serif`;
      bodyLines = invitationLines(context, invitation.text, maxTextWidth);
    }

    const footerTop = Math.max(1820, Math.ceil(bodyTop + bodyHeight() + 85));
    canvas.width = width;
    canvas.height = footerTop + 180;

    const bg = context.createLinearGradient(0, 0, width, canvas.height);
    bg.addColorStop(0, "#fffaf0");
    bg.addColorStop(1, "#f1f4f9");
    context.fillStyle = bg;
    context.fillRect(0, 0, width, canvas.height);

    // Navy travel-inspired heading.
    const header = context.createLinearGradient(0, 0, width, 410);
    header.addColorStop(0, "#12233f");
    header.addColorStop(1, "#7a263a");
    context.fillStyle = header;
    context.fillRect(0, 0, width, 410);
    context.fillStyle = "#f2c14e";
    context.fillRect(0, 404, width, 12);

    context.fillStyle = "#f2c14e";
    context.font = "bold 31px Arial, sans-serif";
    context.fillText("DESTINATION: DISTINGUISHED", left, 95);
    context.fillStyle = "#ffffff";
    context.font = "bold 50px Arial, sans-serif";
    context.fillText(CLUB_DATA.club.name, left, 170);

    // Minimal passport stamp: original vector art drawn by the browser.
    context.save();
    context.translate(width - 207, 266);
    context.rotate(-0.15);
    context.strokeStyle = "#f2c14e";
    context.lineWidth = 8;
    for (const radius of [113, 98]) {
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = "#f2c14e";
    context.font = "bold 29px Arial, sans-serif";
    context.textAlign = "center";
    context.fillText("YOU'RE", 0, -12);
    context.fillText("INVITED!", 0, 27);
    context.restore();

    context.fillStyle = "#7a263a";
    context.font = `bold ${headingFont}px Arial, sans-serif`;
    headingLines.forEach((line, index) => {
      context.fillText(line, left, 505 + index * 88);
    });

    // Draw the invitation EXACTLY from club-data.js, keeping line breaks.
    context.fillStyle = "#172b4d";
    context.font = `${bodyFont}px Arial, sans-serif`;
    let y = bodyTop;
    bodyLines.forEach(line => {
      if (line) context.fillText(line, left, y);
      y += line ? bodyLineHeight : bodyLineHeight * 0.6;
    });

    // The footer carries the theme, not the developer instructions.
    context.fillStyle = "#172b4d";
    context.fillRect(0, footerTop, width, canvas.height - footerTop);
    context.fillStyle = "#f2c14e";
    context.fillRect(0, footerTop, width, 8);
    context.fillStyle = "#ffffff";
    context.font = "bold 37px Arial, sans-serif";
    context.fillText("Many Voices. One Vision. One Journey.", left, footerTop + 92);
    context.font = "30px Arial, sans-serif";
    context.fillStyle = "#e7eaf1";
    context.fillText(CLUB_DATA.club.name, left, footerTop + 140);

    const anchor = document.createElement("a");
    anchor.download = `${invitation.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-invitation.png`;
    anchor.href = canvas.toDataURL("image/png");
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  async function copyInvitation(i) {
    const inv = CLUB_DATA.invitations[i];
    await navigator.clipboard.writeText(inv.text);
    flashButton(`[data-copy="${i}"]`, "Copied ✓");
  }

  function emailInvitation(i) {
    const inv = CLUB_DATA.invitations[i];
    const url = `mailto:?subject=${encodeURIComponent(inv.subject)}&body=${encodeURIComponent(inv.text + "\n\n" + CLUB_DATA.club.website)}`;
    window.location.href = url;
  }

  async function shareInvitation(i) {
    const inv = CLUB_DATA.invitations[i];
    if (navigator.share) {
      await navigator.share({ title: inv.subject, text: inv.text, url: CLUB_DATA.club.website });
    } else {
      await navigator.clipboard.writeText(`${inv.text}\n\n${CLUB_DATA.club.website}`);
      flashButton(`[data-share="${i}"]`, "Copied ✓");
    }
  }

  function flashButton(selector, text) {
    const btn = $(selector);
    const old = btn.textContent;
    btn.textContent = text;
    setTimeout(() => btn.textContent = old, 1400);
  }

  // ---------- Personal goal plan ----------
  const goalFields = [
    "goalName","goalDestination","goalPathways","goalLeadership",
    "goalSupport","goalGuest","goalRenewal","goalClubSupport"
  ];

  function loadGoals() {
    const saved = JSON.parse(localStorage.getItem("omctm-goals") || "{}");
    goalFields.forEach(id => {
      const el = $("#" + id);
      if (el.type === "checkbox") el.checked = Boolean(saved[id]);
      else el.value = saved[id] || "";
    });
  }

  function saveGoals(e) {
    e.preventDefault();
    const payload = {};
    goalFields.forEach(id => {
      const el = $("#" + id);
      payload[id] = el.type === "checkbox" ? el.checked : el.value;
    });
    localStorage.setItem("omctm-goals", JSON.stringify(payload));
    $("#goalStatus").textContent = "Your journey has been saved in this browser. ✓";
    setTimeout(() => $("#goalStatus").textContent = "", 3000);
  }

  function clearGoals() {
    localStorage.removeItem("omctm-goals");
    $("#goalForm").reset();
    $("#goalStatus").textContent = "Saved goals cleared from this browser.";
  }

  // ---------- Celebration sound ----------
  // Uses Web Audio API, so no copyrighted music file is required.
  function playFanfare() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [
      [261.63, 0.00, 0.16],
      [329.63, 0.15, 0.16],
      [392.00, 0.30, 0.18],
      [523.25, 0.47, 0.30],
      [392.00, 0.80, 0.12],
      [523.25, 0.93, 0.40]
    ];
    notes.forEach(([freq, start, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });
  }

  // ---------- Confetti ----------
  const canvas = $("#confettiCanvas");
  const ctx = canvas.getContext("2d");
  let pieces = [];
  let animating = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function launchConfetti() {
    const colors = ["#f2c14e","#7a263a","#172b4d","#ffffff","#2e8b57","#d77a61"];
    pieces = Array.from({ length: 170 }, () => ({
      x: Math.random() * innerWidth,
      y: -20 - Math.random() * innerHeight * .3,
      r: 4 + Math.random() * 5,
      vx: -2 + Math.random() * 4,
      vy: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: -.15 + Math.random() * .3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    if (!animating) {
      animating = true;
      requestAnimationFrame(tickConfetti);
      setTimeout(() => { pieces = []; }, 3500);
    }
  }

  function tickConfetti() {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r/2, p.r*2, p.r);
      ctx.restore();
    });
    pieces = pieces.filter(p => p.y < innerHeight + 30);
    if (pieces.length) requestAnimationFrame(tickConfetti);
    else {
      animating = false;
      ctx.clearRect(0,0,innerWidth,innerHeight);
    }
  }

  // ---------- Celebration dialog ----------
  const dialog = $("#celebrationDialog");

  function celebrate(achievement = latestAchievement()) {
    $("#dialogName").textContent = achievement.name;
    $("#dialogAchievement").textContent = achievement.achievement;
    $("#dialogStamp").textContent = achievement.badge || "STAMPED!";
    if (!dialog.open) dialog.showModal();
    launchConfetti();
    playFanfare();
  }

  // ---------- Social banner generator ----------
  function downloadBanner() {
    const a = latestAchievement();
    const c = document.createElement("canvas");
    c.width = 1640;
    c.height = 924;
    const x = c.getContext("2d");

    const g = x.createLinearGradient(0,0,c.width,c.height);
    g.addColorStop(0,"#0f1d35");
    g.addColorStop(.7,"#172b4d");
    g.addColorStop(1,"#7a263a");
    x.fillStyle = g;
    x.fillRect(0,0,c.width,c.height);

    x.fillStyle = "rgba(242,193,78,.16)";
    x.beginPath();
    x.arc(1430,140,260,0,Math.PI*2);
    x.fill();

    x.strokeStyle = "rgba(255,255,255,.18)";
    x.setLineDash([14,14]);
    x.lineWidth = 3;
    x.beginPath();
    x.arc(1450,780,300,0,Math.PI*2);
    x.stroke();
    x.setLineDash([]);

    x.fillStyle = "#f2c14e";
    x.font = "900 42px Arial";
    x.fillText("LOOK WHO LEVELED UP!", 110, 150);

    x.fillStyle = "#ffffff";
    x.font = "900 96px Arial";
    wrapText(x, a.name, 110, 300, 1160, 108);

    x.fillStyle = "#f2c14e";
    x.font = "800 55px Arial";
    x.fillText(a.achievement, 110, 565);

    x.fillStyle = "#ffffff";
    x.font = "700 34px Arial";
    x.fillText("Destination: Distinguished", 110, 735);

    x.fillStyle = "rgba(255,255,255,.80)";
    x.font = "500 28px Arial";
    x.fillText("Oxford-Miami Community Toastmasters", 110, 790);
    x.fillText("Many Voices. One Vision. One Journey.", 110, 835);

    // Stamp
    x.save();
    x.translate(1370, 495);
    x.rotate(-0.12);
    x.strokeStyle = "#f2c14e";
    x.lineWidth = 12;
    x.beginPath();
    x.arc(0,0,145,0,Math.PI*2);
    x.stroke();
    x.lineWidth = 4;
    x.beginPath();
    x.arc(0,0,122,0,Math.PI*2);
    x.stroke();
    x.fillStyle = "#f2c14e";
    x.textAlign = "center";
    x.font = "900 42px Arial";
    x.fillText(a.badge || "STAMPED!", 0, 13);
    x.restore();

    const link = document.createElement("a");
    link.download = `${slug(a.name)}-${slug(a.badge || "achievement")}-celebration.png`;
    link.href = c.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (let n=0; n<words.length; n++) {
      const test = line + words[n] + " ";
      if (ctx.measureText(test).width > maxWidth && n > 0) {
        ctx.fillText(line, x, yy);
        line = words[n] + " ";
        yy += lineHeight;
      } else line = test;
    }
    ctx.fillText(line, x, yy);
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  }

  // ---------- Events ----------
  $("#goalForm").addEventListener("submit", saveGoals);
  $("#clearGoalsBtn").addEventListener("click", clearGoals);
  $("#printGoalsBtn").addEventListener("click", () => window.print());
  $("#celebrateDemoBtn").addEventListener("click", () => celebrate());
  $("#latestCelebrationBtn").addEventListener("click", () => celebrate());
  $("#downloadBannerBtn").addEventListener("click", downloadBanner);
  $("#closeDialogBtn").addEventListener("click", () => dialog.close());
  $("#replayCelebrationBtn").addEventListener("click", () => {
    launchConfetti();
    playFanfare();
  });

  // ---------- Init ----------
  renderMetrics();
  renderEducation();
  renderJourney();
  renderStamps();
  renderBragBoard();
  renderInvitations();
  loadGoals();
})();
