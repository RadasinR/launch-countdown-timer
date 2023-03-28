let time = 1209600; /* 14 days in seconds */
let daysOld = null;
let hoursOld = null;
let minutesOld = null;
let secondsOld = null;

window.onload = function () {
  resizeCanvases();

  let interval = setInterval(() => {
    time--;
    countdown(time);
  }, 1000);

  window.addEventListener("resize", resizeCanvases);

  if (time <= 0) {
    clearInterval(interval);
  }
};

function countdown(time) {
  let [days, hours, minutes, seconds] = calcTime(time);
  
  if(daysOld != days) {
    flip("days");
    daysOld = days;
  }
  if(hoursOld != hours) {
    flip("hours");
    hoursOld = hours;
  }

  if(minutesOld != minutes) {
    flip("minutes");
    minutesOld = minutes;
  }

  if(secondsOld != seconds) {
    flip("seconds");
    secondsOld = seconds;
  }
  
  displayTime(days, hours, minutes, seconds);
}

function flip(id) {
  let cont = document.querySelector('#' + id).parentElement;
  cont.classList.add("rotate");
  setTimeout(()=> {
    cont.classList.remove("rotate")
  }, 500);
}

function calcTime(time) {
  const secondsToDay = 86400;
  const secondsToHours = 3600;
  const secondsToMinute = 60;

  const days = Math.floor(time / secondsToDay);
  time = time % secondsToDay;

  const hours = Math.floor(time / secondsToHours);
  time = time % secondsToHours;

  const minutes = Math.floor(time / secondsToMinute);
  const seconds = time % secondsToMinute;
  return [days, hours, minutes, seconds];
}

function displayTime(days, hours, minutes, seconds) {
  days = pad(days, 2, "0");
  hours = pad(hours, 2, "0");
  minutes = pad(minutes, 2, "0");
  seconds = pad(seconds, 2, "0");

  drawTimer("days", days);
  drawTimer("hours", hours);
  drawTimer("minutes", minutes);
  drawTimer("seconds", seconds);
}

function pad(value, len, ch) {
  value = "" + value;
  for (let i = 0; i < len - value.length; ++i) {
    value = ch + value;
  }
  return value;
}

function drawTimer(id, data) {
  const container = document.querySelector(".countdown");
  let canvas = document.getElementById(id);
  let ctx = canvas.getContext("2d");
  const fs = window
    .getComputedStyle(container, null)
    .getPropertyValue("font-size");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  /* draw number */

  ctx.fillStyle = "hsl(345, 95%, 68%)";
  ctx.font = `${fs} Red Hat Text`;
  ctx.textAlign = "center";
  ctx.fillText(
    data,
    canvas.width / 2,
    canvas.height / 2 +
      Number(fs.slice(0, fs.length - 2)) /
        3 /* (canvas.height - Number(fs.slice(0, fs.length - 2)))  */
  );

  /* draw darker hat */

  ctx.fillStyle = "hsla(235, 21%, 22%, 0.575)";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

  /* draw dark middle line */
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.closePath();

  /* Light line belowe the dark line */
  ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2 + 2);
  ctx.lineTo(canvas.width, canvas.height / 2 + 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.009)";
  ctx.lineWidth = 2;
  ctx.moveTo(0, canvas.height / 2 + 3);
  ctx.lineTo(canvas.width, canvas.height / 2 + 3);
  ctx.stroke();
  ctx.closePath();
  /* end lines */

  /* draw edge circles */

  let radius = container.clientWidth * 0.048;

  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.89)";
  ctx.arc(0, canvas.height / 2, radius, Math.PI, -Math.PI);
  ctx.fill();
  ctx.arc(canvas.width, canvas.height / 2, radius, -Math.PI, Math.PI);
  ctx.fill();
}

function resizeCanvases() {
  let canvases = document.querySelectorAll("canvas");
  const container = document.querySelector(".countdown");
  for (canvas of canvases) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
}
