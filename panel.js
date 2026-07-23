// Launcher panel logic: open each tool in a separate tab, close them on minimize
const sidePanel = document.getElementById('sidePanel');
const maximizeBtn = document.getElementById('maximizeBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const openClock = document.getElementById('openClock');
const openTimer = document.getElementById('openTimer');
const openStopwatch = document.getElementById('openStopwatch');

// Keep references to windows we open so we can close them
let clockWin = null;
let timerWin = null;
let stopwatchWin = null;

function collapsePanel() {
  sidePanel.classList.add('hidden');
  maximizeBtn.classList.remove('hidden');
  // Close any opened windows (only closes windows opened by this script)
  try { if (clockWin && !clockWin.closed) clockWin.close(); } catch(e){}
  try { if (timerWin && !timerWin.closed) timerWin.close(); } catch(e){}
  try { if (stopwatchWin && !stopwatchWin.closed) stopwatchWin.close(); } catch(e){}
  clockWin = timerWin = stopwatchWin = null;
}

function expandPanel() {
  sidePanel.classList.remove('hidden');
  maximizeBtn.classList.add('hidden');
}

minimizeBtn.addEventListener('click', collapsePanel);
maximizeBtn.addEventListener('click', expandPanel);

// Open each tool in a new tab/window and keep reference
openClock.addEventListener('click', () => {
  // open clock.html in a new tab; store reference so we can close it later
  clockWin = window.open('clock.html', '_blank', 'noopener');
});
openTimer.addEventListener('click', () => {
  timerWin = window.open('timer.html', '_blank', 'noopener');
});
openStopwatch.addEventListener('click', () => {
  stopwatchWin = window.open('stopwatch.html', '_blank', 'noopener');
});
