const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startStopwatchBtn = document.getElementById('startStopwatchBtn');
const stopStopwatchBtn = document.getElementById('stopStopwatchBtn');
const resetStopwatchBtn = document.getElementById('resetStopwatchBtn');

let stopwatchInterval = null;
let stopwatchSeconds = 0;

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

// initialize
updateStopwatchDisplay();
