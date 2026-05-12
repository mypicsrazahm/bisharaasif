const content = window.WEDDING_CONTENT;

document.title = content.site.title;
document
  .querySelector('meta[name="description"]')
  .setAttribute("content", content.site.description);

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setMultilineText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = String(value).replace(/\n/g, "<br>");
  }
}

function setLink(id, href, label) {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
    if (label) {
      element.textContent = label;
    }
  }
}

function populateInvitation() {
  setText("coverGreeting", content.cover.greeting);
  setText("sealMonogram", content.cover.monogram);
  setText("heroBlessing", content.hero.blessing);
  setText("heroLabel", content.hero.label);
  setText("partnerOneName", content.hero.partnerOne);
  setText("partnerTwoName", content.hero.partnerTwo);
  setText("nameJoiner", content.hero.joiner);
  setText("weddingDate", content.hero.dateMain);
  setText("alternateDate", content.hero.dateAlternate);

  setText("familiesHeading", content.families.heading);
  setText("familyOneLabel", content.families.sideOne.label);
  setMultilineText("familyOneNames", content.families.sideOne.names);
  setMultilineText("familyOneAddress", content.families.sideOne.address);
  setLink("familyOnePhone", `tel:${content.families.sideOne.phone}`, "Call family");

  setText("familyTwoLabel", content.families.sideTwo.label);
  setMultilineText("familyTwoNames", content.families.sideTwo.names);
  setMultilineText("familyTwoAddress", content.families.sideTwo.address);
  setLink("familyTwoPhone", `tel:${content.families.sideTwo.phone}`, "Call family");

  setText("eventsHeading", content.events.heading);
  setText("eventOneLabel", content.events.options[0].label);
  setMultilineText("eventOneVenue", content.events.options[0].venue);
  setMultilineText("eventOneDetails", content.events.options[0].details);
  setLink("eventOneMap", content.events.options[0].mapUrl, "Open in maps");

  setText("eventTwoLabel", content.events.options[1].label);
  setMultilineText("eventTwoVenue", content.events.options[1].venue);
  setMultilineText("eventTwoDetails", content.events.options[1].details);
  setLink("eventTwoMap", content.events.options[1].mapUrl, "Open in maps");

  setText("countdownLabel", content.countdown.label);
  setText("countdownTitle", content.countdown.title);

  setText("rsvpHeading", content.rsvp.heading);
  setText("rsvpCopy", content.rsvp.copy);

  setText("closingMark", content.closing.mark);
  setText("closingText", content.closing.text);

  const eventSelect = document.getElementById("guestEvent");
  content.events.options.forEach((eventItem) => {
    const option = document.createElement("option");
    option.value = eventItem.label;
    option.textContent = eventItem.label;
    eventSelect.appendChild(option);
  });
}

function setupCover() {
  const cover = document.getElementById("cover");
  const openInvitation = document.getElementById("openInvitation");

  setText("coverGreeting", content.cover.greeting);
  document.querySelector(".cover-hint").textContent = content.cover.hint;

  openInvitation.addEventListener("click", () => {
    document.body.classList.add("is-open");
    cover.classList.add("is-hidden");
  });
}

function setupRSVP() {
  const form = document.getElementById("rsvpForm");
  const successState = document.getElementById("successState");
  const attendanceDetails = document.getElementById("attendanceDetails");
  const guestEvent = document.getElementById("guestEvent");
  const attendanceInputs = document.querySelectorAll('input[name="attendance"]');

  attendanceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const isAttending = document.querySelector('input[name="attendance"]:checked')?.value === "Attending";
      attendanceDetails.classList.toggle("is-open", isAttending);

      if (isAttending) {
        guestEvent.required = true;
      } else {
        guestEvent.required = false;
        guestEvent.value = "";
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const lines = [
      `Name: ${formData.get("guestName")}`,
      `Attendance: ${formData.get("attendance")}`
    ];

    if (formData.get("attendance") === "Attending") {
      lines.push(`Event: ${formData.get("guestEvent")}`);
      lines.push(`Guests: ${formData.get("guestCount")}`);
    }

    const message = formData.get("guestMessage")?.trim();
    if (message) {
      lines.push(`Message: ${message}`);
    }

    const mailto = `mailto:${encodeURIComponent(content.rsvp.email)}?subject=${encodeURIComponent(content.rsvp.subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;

    form.classList.add("is-hidden");
    successState.classList.add("is-visible");
  });
}

function setupCountdown() {
  const targetDate = new Date(content.countdown.target);
  const targets = {
    days: document.getElementById("daysValue"),
    hours: document.getElementById("hoursValue"),
    minutes: document.getElementById("minutesValue"),
    seconds: document.getElementById("secondsValue")
  };

  function updateCountdown() {
    const now = new Date();
    const distance = targetDate.getTime() - now.getTime();

    if (distance <= 0) {
      targets.days.textContent = "00";
      targets.hours.textContent = "00";
      targets.minutes.textContent = "00";
      targets.seconds.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    targets.days.textContent = String(days).padStart(2, "0");
    targets.hours.textContent = String(hours).padStart(2, "0");
    targets.minutes.textContent = String(minutes).padStart(2, "0");
    targets.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

populateInvitation();
setupCover();
setupRSVP();
setupCountdown();
setupReveal();
