/*variables*/
// up-down length adjust buttons
const breakDecremment = document.getElementById("break-decrement");
const sessionDecremment = document.getElementById("session-decrement");
const breakIncremment = document.getElementById("break-increment");
const sessionIncremment = document.getElementById("session-increment");
const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const reset = document.getElementById("reset"); // reset button
const timer = document.getElementById("time-left"); // timer
const startStop = document.getElementById("start_stop"); // play/pause button

/*listeners*/
// up-down length adjust listeners
breakDecremment.addEventListener("click", decrementBreak);
sessionDecremment.addEventListener("click", decrementSession);
breakIncremment.addEventListener("click", incrementBreak);
sessionIncremment.addEventListener("click", incrementSession);
reset.addEventListener("click", resetIt); // reset button
startStop.addEventListener("click", playbutton); // play/pause button

/*functions*/
// up-down length adjust functions
function decrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value >= 0) { breakLength.innerHTML = value - 1; }
}

function decrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value >= 0) { sessionLength.innerHTML = value - 1; }
  timer.innerHTML = sessionLength.innerHTML + ':' + '00';
  stopTimer();
}

function incrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value < 60) { breakLength.innerHTML = value + 1; }
}

function incrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value < 60) { sessionLength.innerHTML = value + 1; }
  timer.innerHTML = sessionLength.innerHTML + ':' + '00';
  stopTimer();
}

// reset button
function resetIt() {
  breakLength.innerHTML = 5;
  sessionLength.innerHTML = 25;
  timer.innerHTML = '25:00';
}

function getTime() {
  let time = timer.innerHTML.split('');
  let minutes = parseInt(time[0] + time[1]);
  let seconds = parseInt(time[3] + time[4]);
  return minutes * 60 + seconds; // total seconds
}

function displayTime() {
  let duration = getTime();
  if (--duration === 0) { return; }
  timer.innerHTML =
    Math.floor(duration / 60) + ':' +
    Math.floor(duration % 60);
}

let counter = 0;
let timerID = 0;
function playbutton() {
  if (++counter % 2 !== 0) {
    timerID = startTimer();
    startStop.firstChild.classList.remove('fa-play');
    startStop.firstChild.classList.add('fa-pause');
  } else {
    stopTimer();
    startStop.firstChild.classList.add('fa-play');
    startStop.firstChild.classList.remove('fa-pause');
  }
}

let startTimer = function () {
  return setInterval(displayTime, 1000);
}

function stopTimer() {
  clearInterval(timerID);
}