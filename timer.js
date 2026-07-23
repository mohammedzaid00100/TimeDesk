const timerInput = document.getElementById('timerInput');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');

let timerInterval = null;
let remainingSeconds = 0;

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
  const minutes = parseFloat(timerInput.value);
  if (!Number.isFinite(minutes) || minutes <= 0) return;
  remainingSeconds = Math.round(minutes * 60);
  clearInterval(timerInterval);
  timerDisplay.textContent = formatTimer(remainingSeconds);
  timerInterval = setInterval(() => {
    remainingSeconds--;
    timerDisplay.textContent = formatTimer(remainingSeconds);
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.textContent = '00:00';
      // visual cue
      document.body.style.background = '#041014';
      setTimeout(()=> document.body.style.background = '', 400);
    }
  }, 1000);
});

resetTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = 0;
  timerDisplay.textContent = '00:00';
  timerInput.value = '';
});
