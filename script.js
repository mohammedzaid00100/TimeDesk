// Panel toggle logic
const sidePanel = document.getElementById('sidePanel');
const maximizeBtn = document.getElementById('maximizeBtn');
const minimizeBtn = document.getElementById('minimizeBtn');

function collapsePanel() {
  sidePanel.classList.remove('expanded');
  sidePanel.classList.add('collapsed');
  sidePanel.setAttribute('aria-hidden', 'true');
  sidePanel.style.transform = 'translateX(-8px) scale(.98)';
  maximizeBtn.classList.remove('hidden');
}
function expandPanel() {
  sidePanel.classList.remove('collapsed');
  sidePanel.classList.add('expanded');
  sidePanel.setAttribute('aria-hidden', 'false');
  sidePanel.style.transform = 'none';
  maximizeBtn.classList.add('hidden');
}

minimizeBtn.addEventListener('click', collapsePanel);
maximizeBtn.addEventListener('click', expandPanel);

// Section switching
document.querySelectorAll('.panel-action').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    showSection(target);
  });
});

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// CLOCK 24-hour, no AM/PM, centered, big and bold
const clockDisplay = document.getElementById('clockDisplay');
function updateClock() {
  const now = new Date();
  // 24-hour format with leading zeros for HH:MM:SS
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  clockDisplay.textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateClock, 1000);
updateClock();

// TIMER
let timerInterval = null;
const timerInput = document.getElementById('timerInput');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

function formatTimer(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  }
  return `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

startTimerBtn.addEventListener('click', () => {
  let time = parseInt(timerInput.value, 10);
  if (!Number.isFinite(time) || time <= 0) return;
  clearInterval(timerInterval);
  timerDisplay.textContent = formatTimer(time);
  timerInterval = setInterval(() => {
    time--;
    timerDisplay.textContent = formatTimer(time);
    if (time <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      // simple visual cue instead of alert
      timerDisplay.textContent = '00:00';
      flashAccent();
    }
  }, 1000);
});

resetTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.textContent = '00:00';
  timerInput.value = '';
});

// STOPWATCH
let stopwatchInterval = null;
let stopwatchSeconds = 0;
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopwatchBtn = document.getElementById('startStopwatchBtn');
const stopStopwatchBtn = document.getElementById('stopStopwatchBtn');
const resetStopwatchBtn = document.getElementById('resetStopwatchBtn');

function updateStopwatchDisplay() {
  const hrs = Math.floor(stopwatchSeconds / 3600);
  const mins = Math.floor((stopwatchSeconds % 3600) / 60);
  const secs = stopwatchSeconds % 60;
  stopwatchDisplay.textContent = `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

startStopwatchBtn.addEventListener('click', () => {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    updateStopwatchDisplay();
  }, 1000);
});

stopStopwatchBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

resetStopwatchBtn.addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
});

// small accent flash when timer ends
function flashAccent() {
  const original = document.body.style.background;
  document.body.style.background = '#041014';
  setTimeout(() => document.body.style.background = original, 400);
}

// Initialize: show clock section by default and panel expanded
showSection('clock');
expandPanel();
