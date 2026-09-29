(() => {
  const data = window.WEDDING_DATA;
  if (!data) throw new Error("WEDDING_DATA is missing.");

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---- Populate core text ----
  $("#introBride").textContent = data.couple.bride;
  $("#introGroom").textContent = data.couple.groom;
  $("#introBrideMr").textContent = data.couple.brideMarathi;
  $("#introGroomMr").textContent = data.couple.groomMarathi;
  $("#introDate").textContent = data.wedding.dateShort;
  $("#introEyebrow").textContent = data.intro.eyebrow;
  $("#introMessage").textContent = data.intro.message;
  $("#countdownDay").textContent = data.wedding.day;
  $("#countdownDate").textContent = data.wedding.dateDisplay;
  $("#countdownTime").textContent = data.wedding.time;
  $("#familyHeading").textContent = data.family.heading;
  $("#heroCoupleImage").src = data.hero.image;
  $("#heroCoupleImage").alt = data.hero.alt;
  $("#brideFamilyLabel").textContent = data.family.brideSide.label;
  $("#brideParent1En").textContent = data.family.brideSide.parent1.english;
  $("#brideParent1Mr").textContent = data.family.brideSide.parent1.marathi;
  $("#brideParent2En").textContent = data.family.brideSide.parent2.english;
  $("#brideParent2Mr").textContent = data.family.brideSide.parent2.marathi;
  $("#groomFamilyLabel").textContent = data.family.groomSide.label;
  $("#groomParent1En").textContent = data.family.groomSide.parent1.english;
  $("#groomParent1Mr").textContent = data.family.groomSide.parent1.marathi;
  $("#groomParent2En").textContent = data.family.groomSide.parent2.english;
  $("#groomParent2Mr").textContent = data.family.groomSide.parent2.marathi;
  $("#monogram").textContent = data.couple.monogram;
  $("#closingDate").textContent = data.wedding.dateShort;
  $("#closingCity").textContent = data.wedding.city;

  // ---- Personalized guest greeting via ?guest=Name&gid=G001 ----
  const params = new URLSearchParams(window.location.search);
  const guest = (params.get("guest") || "").trim();
  const guestId = (params.get("gid") || "").trim();
  if (guest) {
    $("#guestName").textContent = guest;
    $("#personalGreeting").hidden = false;
    $("#rsvpName").value = guest;
  }
  $("#guestId").value = guestId;

  // ---- Curtain opening sequence ----
  const introGate = $("#introGate");
  const tapBegin = $("#tapBegin");
  const ganpatiReveal = $("#ganpatiReveal");
  const nameReveal = $("#nameReveal");
  const openInvite = $("#openInvite");

  tapBegin.addEventListener("click", () => {
    introGate.classList.add("opening");
    setTimeout(() => {
      ganpatiReveal.classList.add("visible");
      ganpatiReveal.setAttribute("aria-hidden", "false");
    }, 550);
    setTimeout(() => {
      ganpatiReveal.classList.remove("visible");
      ganpatiReveal.setAttribute("aria-hidden", "true");
      nameReveal.classList.add("visible");
      nameReveal.setAttribute("aria-hidden", "false");
    }, 2400);
  }, { once: true });

  openInvite.addEventListener("click", () => {
    introGate.classList.add("finished");
    document.body.classList.remove("intro-locked");
    setTimeout(() => $("#hero").scrollIntoView({ behavior: "smooth", block: "start" }), 250);
  });

  // ---- Countdown ----
  const target = new Date(data.wedding.iso).getTime();
  const pad = n => String(Math.max(0, n)).padStart(2, "0");
  function updateCountdown() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      const weddingEnd = target + 12 * 60 * 60 * 1000;
      $("#days").textContent = "00";
      $("#hours").textContent = "00";
      $("#minutes").textContent = "00";
      $("#seconds").textContent = "00";
      $("#countdownStatus").textContent = now <= weddingEnd ? "Today’s the day! ❤️" : "And so our forever began. ❤️";
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    $("#days").textContent = pad(days);
    $("#hours").textContent = pad(hours);
    $("#minutes").textContent = pad(minutes);
    $("#seconds").textContent = pad(seconds);
    $("#countdownStatus").textContent = "";
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- ICS generation ----
  const escapeIcs = s => String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  function toIcsLocal(dateISO, time24) {
    return `${dateISO.replace(/-/g, "")}T${time24.replace(":", "")}00`;
  }
  function addToCalendar(event) {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nikita & Om Wedding//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${event.id}-${Date.now()}@nikita-om-wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART;TZID=Asia/Kolkata:${toIcsLocal(event.dateISO, event.time24)}`,
      `SUMMARY:${escapeIcs(`${data.couple.bride} & ${data.couple.groom} | ${event.title}`)}`,
      `LOCATION:${escapeIcs(`${event.venue}, ${event.address}`)}`,
      `DESCRIPTION:${escapeIcs(`Wedding celebration for ${data.couple.bride} & ${data.couple.groom}.`)}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}-nikita-om.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---- Render events ----
  const eventsList = $("#eventsList");
  const eventTemplate = $("#eventTemplate");
  data.events.forEach(event => {
    const node = eventTemplate.content.cloneNode(true);
    const card = $(".event-card", node);
    if (event.featured) card.classList.add("featured");
    const scene = $(".event-scene", node);
    scene.classList.add(event.scene);
    if (event.image) {
      scene.classList.add("has-image");
      const eventImg = document.createElement("img");
      eventImg.className = "event-scene-image";
      eventImg.src = event.image;
      eventImg.alt = event.imageAlt || `${event.title} celebration`;
      eventImg.loading = "lazy";
      eventImg.decoding = "async";
      scene.setAttribute("aria-hidden", "false");
      scene.appendChild(eventImg);
    }
    $(".event-icon", node).textContent = event.icon;
    $(".event-subtitle", node).textContent = event.subtitle;
    $(".event-title", node).textContent = event.title;

    const dateWrap = $(".event-date", node);
    const dayEl = $(".event-day", node);
    const dateEl = $(".event-date-display", node);
    const timeEl = $(".event-time", node);
    dayEl.textContent = event.day || "";
    dateEl.textContent = event.dateDisplay || "";
    timeEl.textContent = event.time || "";
    dayEl.hidden = !event.day;
    dateEl.hidden = !event.dateDisplay;
    timeEl.hidden = !event.time;
    dateWrap.hidden = !event.day && !event.dateDisplay && !event.time;

    const venueBlock = $(".venue-block", node);
    const venueEl = $(".event-venue", node);
    const addressEl = $(".event-address", node);
    venueEl.textContent = event.venue || "";
    addressEl.textContent = event.address || "";
    venueBlock.hidden = !event.venue && !event.address;

    const mapBtn = $(".map-btn", node);
    const calendarBtn = $(".calendar-btn", node);
    const actions = $(".event-actions", node);
    if (event.mapUrl) {
      mapBtn.href = event.mapUrl;
      mapBtn.textContent = event.featured ? "📍 Open in Maps" : "📍 Get Directions";
      mapBtn.hidden = false;
    } else {
      mapBtn.hidden = true;
    }
    if (event.dateISO && event.time24) {
      calendarBtn.hidden = false;
      calendarBtn.addEventListener("click", () => addToCalendar(event));
    } else {
      calendarBtn.hidden = true;
    }
    actions.hidden = mapBtn.hidden && calendarBtn.hidden;

    const qrDetails = $(".qr-details", node);
    const qr = $(".qr-image", node);
    if (event.qr) {
      qr.src = event.qr;
      qr.alt = `QR code for ${event.venue || event.title} directions`;
      qr.loading = "lazy";
      qr.decoding = "async";
      qrDetails.hidden = false;
    } else {
      qrDetails.hidden = true;
    }
    eventsList.appendChild(node);
  });

  const weddingEvent = data.events.find(e => e.id === "wedding") || data.events.at(-1);
  $("#finalVenueLink").href = weddingEvent.mapUrl;

  // ---- Render story ----
  const storyList = $("#storyList");
  const storyTemplate = $("#storyTemplate");
  data.story.forEach(item => {
    const node = storyTemplate.content.cloneNode(true);
    $(".story-step", node).textContent = item.step;
    $(".story-copy h3", node).textContent = item.title;
    $(".story-copy p", node).textContent = item.copy;
    const images = $(".story-images", node);
    images.classList.add("single");
    const img = document.createElement("img");
    img.className = "story-photo";
    img.src = item.image;
    img.alt = item.imageAlt || "Nikita and Om";
    img.loading = "lazy";
    img.decoding = "async";
    images.appendChild(img);
    storyList.appendChild(node);
  });

  // ---- Music ----
  const music = $("#weddingMusic");
  const musicToggle = $("#musicToggle");
  if (data.music?.src) {
    music.src = data.music.src;
    musicToggle.hidden = false;
    musicToggle.addEventListener("click", async () => {
      if (music.paused) {
        try {
          await music.play();
          musicToggle.classList.add("playing");
          musicToggle.textContent = "♫";
        } catch {
          musicToggle.title = "Tap again to play music";
        }
      } else {
        music.pause();
        musicToggle.classList.remove("playing");
        musicToggle.textContent = "♪";
      }
    });
  }

  // ---- Reveal on scroll ----
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13 });
    $$(".reveal").forEach(el => observer.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("in-view"));
  }

  // ---- RSVP ----
  const rsvpForm = $("#rsvpForm");
  const rsvpStatus = $("#rsvpStatus");
  const rsvpSubmit = $("#rsvpSubmit");

  rsvpForm.addEventListener("submit", async e => {
    e.preventDefault();
    rsvpStatus.textContent = "";
    if (!rsvpForm.reportValidity()) return;

    const fd = new FormData(rsvpForm);
    const payload = Object.fromEntries(fd.entries());
    rsvpSubmit.disabled = true;
    rsvpSubmit.textContent = "Sending…";
    rsvpStatus.textContent = "Saving your response…";

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      let res;
      try {
        res = await fetch(data.rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeoutId);
      }
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "We couldn't save your RSVP just now.");
      rsvpStatus.textContent = "Thank you ❤️ Your RSVP has been saved.";
      rsvpForm.reset();
      if (guest) $("#rsvpName").value = guest;
      $("#guestId").value = guestId;
    } catch (err) {
      if (err?.name === "AbortError") {
        rsvpStatus.textContent = "The RSVP request took too long. Please check your connection and try again.";
      } else if (err?.message === "RSVP storage is not configured yet.") {
        rsvpStatus.textContent = "RSVP saving is being set up. Please try again shortly.";
      } else {
        rsvpStatus.textContent = err?.message || "We couldn't save your RSVP just now. Please try again in a moment.";
      }
      console.error(err);
    } finally {
      rsvpSubmit.disabled = false;
      rsvpSubmit.textContent = "Send RSVP";
    }
  });
})();
