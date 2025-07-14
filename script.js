let timerInterval;
let isRunning = false;

function startTimer() {
  if (isRunning) return;

  const durationInput = document.getElementById("duration");
  const minutes = parseInt(durationInput.value);
  if (isNaN(minutes) || minutes <= 0) return;

  isRunning = true;
  document.getElementById("startBtn").disabled = true;

  const totalSeconds = minutes * 60;
  let secondsLeft = totalSeconds;

  const timeDisplay = document.getElementById("timeDisplay");
  const bar = document.getElementById("barInner");
  const percentText = document.getElementById("percent");
  const walker = document.getElementById("walker");
  const barContainer = document.querySelector(".bar");

  function update() {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;

    const progress = (totalSeconds - secondsLeft) / totalSeconds;
    const percent = progress * 100;

    // Update display waktu di tengah lingkaran
    const timeText = document.getElementById("timeText");
    timeText.textContent = `${String(mins).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;

    // Update lingkaran progress
    const circle = document.getElementById("timeDisplay");
    const remainingPercent = 100 - percent;
    const color = getColorByProgress(progress); // progress dari 0 ke 1
    circle.style.background = `conic-gradient(${color} 0% ${remainingPercent}%, #e0e0e0 ${remainingPercent}% 100%)`;

    // Update bar horizontal (jika masih dipakai)
    bar.style.width = percent + "%";
    percentText.textContent = `${Math.floor(percent)}%`;

    // Update walker
    const barWidth = barContainer.offsetWidth;
    const walkerWidth = walker.offsetWidth;
    const maxMove = barWidth - walkerWidth;
    walker.style.transform = `translateX(${progress * maxMove}px)`;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      document.getElementById("startBtn").disabled = false;
      document.getElementById("alarmSound").play();
    }

    secondsLeft--;
  }

  update();
  timerInterval = setInterval(update, 1000);
}

function getColorByProgress(progress) {
  // progress dari 0 (baru mulai) ke 1 (hampir habis)
  const r = Math.floor(76 + (255 - 76) * progress); // dari 76 (green) ke 255 (red)
  const g = Math.floor(175 - (175 - 0) * progress); // dari 175 (green) ke 0
  const b = Math.floor(80 - (80 - 0) * progress); // dari 80 ke 0

  return `rgb(${r},${g},${b})`;
}
