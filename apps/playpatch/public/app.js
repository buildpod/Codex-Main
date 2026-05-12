const activities = [
  {
    id: "paper-bridge-lab",
    title: "Paper Bridge Lab",
    type: "Make",
    minutes: 10,
    ages: ["4-5", "6-8"],
    energy: "calm",
    color: "#ffd66b",
    description: "Build a tiny bridge from paper and test how many toy passengers it can hold.",
    supplies: ["Paper", "Books", "Small toys"],
    steps: [
      "Fold one sheet of paper into a long bridge.",
      "Place it between two books.",
      "Add small toys one by one and count how many it holds.",
      "Try a new fold and test again."
    ],
    safety: "Use light toys only and keep books flat."
  },
  {
    id: "rainbow-hunt",
    title: "Rainbow Hunt",
    type: "Explore",
    minutes: 10,
    ages: ["4-5", "6-8"],
    energy: "active",
    color: "#40b7a2",
    description: "Find one safe object for each rainbow color and make a tiny museum.",
    supplies: ["Basket", "Crayons"],
    steps: [
      "Pick red, yellow, green, blue, and one bonus color.",
      "Find a safe object for each color.",
      "Line them up from warm to cool.",
      "Tell a one-line story about the collection."
    ],
    safety: "Only collect safe household objects approved by a grown-up."
  },
  {
    id: "story-dice",
    title: "Story Dice Theater",
    type: "Think",
    minutes: 20,
    ages: ["6-8", "9-10"],
    energy: "calm",
    color: "#ff7b67",
    description: "Roll imaginary dice for hero, place, problem, and silly ending.",
    supplies: ["Paper", "Pencil", "Three tiny toys"],
    steps: [
      "Choose a hero toy.",
      "Choose a place in the room.",
      "Invent one problem the hero must solve.",
      "Act out the ending in three scenes."
    ],
    safety: "Keep play on the floor or table."
  },
  {
    id: "animal-yoga",
    title: "Animal Yoga Trail",
    type: "Move",
    minutes: 10,
    ages: ["4-5", "6-8"],
    energy: "active",
    color: "#7fb95d",
    description: "Move through five animal poses and finish with turtle breathing.",
    supplies: ["Soft floor space"],
    steps: [
      "Stretch tall like a giraffe.",
      "Curl small like a hedgehog.",
      "Balance like a flamingo.",
      "Crawl slow like a turtle.",
      "Take five calm turtle breaths."
    ],
    safety: "Use open floor space and skip any uncomfortable pose."
  },
  {
    id: "kitchen-patterns",
    title: "Kitchen Pattern Lab",
    type: "Think",
    minutes: 20,
    ages: ["6-8", "9-10"],
    energy: "mixed",
    color: "#2772b8",
    description: "Use spoons, cups, or safe snacks to build repeating patterns.",
    supplies: ["Spoons", "Cups", "Plate"],
    steps: [
      "Pick two or three safe objects.",
      "Make an AB pattern.",
      "Make an AAB pattern.",
      "Ask someone to guess what comes next."
    ],
    safety: "Use safe, clean objects. No knives or glass."
  },
  {
    id: "quiet-cloud",
    title: "Quiet Cloud Jar",
    type: "Calm",
    minutes: 30,
    ages: ["4-5", "6-8", "9-10"],
    energy: "calm",
    color: "#8ecae6",
    description: "Create a calm-down jar drawing and fill it with tiny cloud wishes.",
    supplies: ["Paper", "Crayons", "Small container"],
    steps: [
      "Draw a jar outline.",
      "Draw five soft clouds inside.",
      "Write or draw one wish on each cloud.",
      "Point to a cloud and take three slow breaths."
    ],
    safety: "Use a plastic container if using a real jar."
  }
];

const state = {
  age: "4-5",
  time: 10,
  energy: "mixed",
  activeId: "paper-bridge-lab",
  timerSeconds: 600,
  timerRunning: false,
  timerHandle: null,
  completed: Number(localStorage.getItem("playpatch.completed") || 0),
  favorites: new Set(JSON.parse(localStorage.getItem("playpatch.favorites") || "[]"))
};

const nodes = {
  planTitle: document.querySelector("#planTitle"),
  planSummary: document.querySelector("#planSummary"),
  completedCount: document.querySelector("#completedCount"),
  patchStrip: document.querySelector("#patchStrip"),
  activityGrid: document.querySelector("#activityGrid"),
  deckSignal: document.querySelector("#deckSignal"),
  missionArt: document.querySelector("#missionArt"),
  missionType: document.querySelector("#missionType"),
  missionMinutes: document.querySelector("#missionMinutes"),
  missionAge: document.querySelector("#missionAge"),
  missionTitle: document.querySelector("#missionTitle"),
  missionDescription: document.querySelector("#missionDescription"),
  supplyList: document.querySelector("#supplyList"),
  stepList: document.querySelector("#stepList"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerStatus: document.querySelector("#timerStatus"),
  timerButton: document.querySelector("#timerButton"),
  favoriteButton: document.querySelector("#favoriteButton"),
  favoriteCount: document.querySelector("#favoriteCount"),
  patchCount: document.querySelector("#patchCount"),
  parentPanel: document.querySelector("#parentPanel")
};

const patchNames = ["Bridge", "Rainbow", "Story", "Move", "Pattern", "Calm"];

function activeActivity() {
  return activities.find((activity) => activity.id === state.activeId) || activities[0];
}

function filteredActivities() {
  return activities.filter((activity) => {
    const ageMatch = activity.ages.includes(state.age);
    const timeMatch = activity.minutes <= state.time;
    const energyMatch = state.energy === "mixed" || activity.energy === state.energy || activity.energy === "mixed";
    return ageMatch && timeMatch && energyMatch;
  });
}

function saveState() {
  localStorage.setItem("playpatch.completed", String(state.completed));
  localStorage.setItem("playpatch.favorites", JSON.stringify([...state.favorites]));
}

function activitySvg(activity) {
  const fill = activity.color;
  return `
    <svg viewBox="0 0 720 310" role="img" aria-label="${activity.title}">
      <rect width="720" height="310" fill="${fill}"/>
      <circle cx="96" cy="66" r="42" fill="#fff7e8" opacity="0.85"/>
      <circle cx="608" cy="82" r="70" fill="#fff7e8" opacity="0.36"/>
      <path d="M0 252c118-50 215-58 323-28 131 36 240 26 397-42v128H0Z" fill="#fff7e8" opacity="0.76"/>
      <path d="M142 223c32-77 79-115 141-115 63 0 109 38 140 115" fill="none" stroke="#17324d" stroke-width="16" stroke-linecap="round"/>
      <path d="M245 212h108" stroke="#17324d" stroke-width="16" stroke-linecap="round"/>
      <circle cx="252" cy="122" r="18" fill="#17324d"/>
      <circle cx="354" cy="122" r="18" fill="#17324d"/>
      <path d="M270 166c28 21 57 21 86 0" fill="none" stroke="#17324d" stroke-width="12" stroke-linecap="round"/>
      <rect x="486" y="152" width="92" height="74" rx="14" fill="#fffaf0" stroke="#17324d" stroke-width="10"/>
      <path d="M500 185h64M500 205h42" stroke="#17324d" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `;
}

function setActive(id) {
  state.activeId = id;
  const activity = activeActivity();
  state.timerSeconds = activity.minutes * 60;
  stopTimer();
  render();
}

function renderDeck() {
  const deck = filteredActivities();
  nodes.deckSignal.textContent = `${deck.length} cards`;
  nodes.activityGrid.innerHTML = deck
    .map(
      (activity) => `
        <button class="activity-card ${activity.id === state.activeId ? "active" : ""}" type="button" data-activity="${activity.id}">
          <div>
            <span>${activity.type} · ${activity.minutes}m</span>
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
          </div>
          <strong>${activity.energy}</strong>
        </button>
      `
    )
    .join("");

  if (!deck.some((activity) => activity.id === state.activeId) && deck[0]) {
    state.activeId = deck[0].id;
  }
}

function renderMission() {
  const activity = activeActivity();
  nodes.missionArt.innerHTML = activitySvg(activity);
  nodes.missionType.textContent = activity.type;
  nodes.missionMinutes.textContent = `${activity.minutes} min`;
  nodes.missionAge.textContent = activity.ages.join(", ");
  nodes.missionTitle.textContent = activity.title;
  nodes.missionDescription.textContent = activity.description;
  nodes.supplyList.innerHTML = activity.supplies.map((supply) => `<span>${supply}</span>`).join("");
  nodes.stepList.innerHTML = activity.steps.map((step) => `<li>${step}</li>`).join("");
  nodes.favoriteButton.textContent = state.favorites.has(activity.id) ? "Saved" : "Save";
  renderTimer();
}

function renderTimer() {
  const minutes = Math.floor(state.timerSeconds / 60);
  const seconds = state.timerSeconds % 60;
  nodes.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  nodes.timerButton.textContent = state.timerRunning ? "Pause" : "Start";
  nodes.timerStatus.textContent =
    state.timerSeconds === 0
      ? "Time is complete. Finish when ready."
      : state.timerRunning
        ? "Play is in progress."
        : "Ready when you are.";
}

function renderStats() {
  nodes.completedCount.textContent = state.completed;
  nodes.favoriteCount.textContent = state.favorites.size;
  nodes.patchCount.textContent = state.completed;
  nodes.patchStrip.innerHTML = patchNames
    .map((patch, index) => {
      const earned = index < state.completed;
      return `<span class="${earned ? "earned" : ""}">${earned ? patch : "Locked"}</span>`;
    })
    .join("");
}

function renderPlanCopy() {
  const deck = filteredActivities();
  nodes.planTitle.textContent = deck.length ? `${deck.length} activity picks ready` : "No matching cards";
  nodes.planSummary.textContent = deck.length
    ? `Age ${state.age}, up to ${state.time} minutes, ${state.energy} energy. Start with ${activeActivity().title}.`
    : "Try a longer time window or mixed energy.";
}

function render() {
  renderDeck();
  renderMission();
  renderStats();
  renderPlanCopy();
}

function stopTimer() {
  state.timerRunning = false;
  if (state.timerHandle) window.clearInterval(state.timerHandle);
  state.timerHandle = null;
}

function toggleTimer() {
  if (state.timerRunning) {
    stopTimer();
    renderTimer();
    return;
  }
  state.timerRunning = true;
  state.timerHandle = window.setInterval(() => {
    state.timerSeconds = Math.max(0, state.timerSeconds - 1);
    if (state.timerSeconds === 0) stopTimer();
    renderTimer();
  }, 1000);
  renderTimer();
}

function buildPlan() {
  const deck = filteredActivities();
  if (deck[0]) setActive(deck[0].id);
  nodes.planTitle.textContent = deck.length ? "Fresh plan ready" : "Adjust filters";
}

function shuffleActivity() {
  const deck = filteredActivities();
  if (!deck.length) return;
  const currentIndex = deck.findIndex((activity) => activity.id === state.activeId);
  const next = deck[(currentIndex + 1 + deck.length) % deck.length];
  setActive(next.id);
}

function finishActivity() {
  state.completed += 1;
  saveState();
  renderStats();
  nodes.planTitle.textContent = "Patch earned";
  nodes.planSummary.textContent = `${activeActivity().title} finished. Pick another calm activity when ready.`;
}

function toggleFavorite() {
  const id = state.activeId;
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  saveState();
  render();
}

function parentGate() {
  const answer = window.prompt("Parent gate: what is 6 + 3?");
  if (answer === "9") {
    nodes.parentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  nodes.planTitle.textContent = "Parent gate locked";
  nodes.planSummary.textContent = "Ask a grown-up to unlock settings or purchases.";
}

function setSegment(container, attr, value) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset[attr] === String(value));
  });
}

document.querySelector("#ageFilter").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-age]");
  if (!button) return;
  state.age = button.dataset.age;
  setSegment(event.currentTarget, "age", state.age);
  buildPlan();
});

document.querySelector("#timeFilter").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-time]");
  if (!button) return;
  state.time = Number(button.dataset.time);
  setSegment(event.currentTarget, "time", state.time);
  buildPlan();
});

document.querySelector("#energyFilter").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-energy]");
  if (!button) return;
  state.energy = button.dataset.energy;
  setSegment(event.currentTarget, "energy", state.energy);
  buildPlan();
});

nodes.activityGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-activity]");
  if (card) setActive(card.dataset.activity);
});

document.querySelector("#buildPlanButton").addEventListener("click", buildPlan);
document.querySelector("#shuffleButton").addEventListener("click", shuffleActivity);
document.querySelector("#startActivityButton").addEventListener("click", () => {
  nodes.planTitle.textContent = "Activity started";
  nodes.planSummary.textContent = activeActivity().safety;
  toggleTimer();
});
document.querySelector("#timerButton").addEventListener("click", toggleTimer);
document.querySelector("#resetTimerButton").addEventListener("click", () => {
  stopTimer();
  state.timerSeconds = activeActivity().minutes * 60;
  renderTimer();
});
document.querySelector("#finishButton").addEventListener("click", finishActivity);
document.querySelector("#favoriteButton").addEventListener("click", toggleFavorite);
document.querySelector("#parentButton").addEventListener("click", parentGate);

document.querySelectorAll("[data-pack]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-pack]").forEach((card) => {
      card.classList.toggle("active", card === button);
    });
    if (button.dataset.pack === "starter") {
      nodes.planTitle.textContent = "Starter Patch selected";
      nodes.planSummary.textContent = "Six included activities are ready without an account or purchase flow.";
      return;
    }
    nodes.planTitle.textContent = "Premium pack preview";
    nodes.planSummary.textContent = "This pack is parent-gated and not purchasable in the MVP prototype.";
  });
});

document.querySelector("#soundToggle").addEventListener("change", (event) => {
  nodes.planTitle.textContent = event.target.checked ? "Sound cues preview on" : "Sound cues off";
  nodes.planSummary.textContent = "The MVP keeps sound local and optional.";
});

document.querySelector("#calmModeToggle").addEventListener("change", (event) => {
  nodes.planTitle.textContent = event.target.checked ? "Calm endings on" : "Calm endings off";
  nodes.planSummary.textContent = event.target.checked
    ? "Activities finish with a calm handoff."
    : "Parents can turn this back on for gentler transitions.";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
