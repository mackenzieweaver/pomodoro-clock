/*                              variables                              */

// up-down length adjust buttons
const breakDecremment = document.getElementById("break-decrement");
const sessionDecremment = document.getElementById("session-decrement");
const breakIncremment = document.getElementById("break-increment");
const sessionIncremment = document.getElementById("session-increment");
const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");

// reset button
const reset = document.getElementById("reset");

// timer
const timer = document.getElementById("time-left");

// play/pause button
const startStop = document.getElementById("start_stop");

/*                               listeners                             */

// up-down length adjust listeners
breakDecremment.addEventListener("click", decrementBreak);
sessionDecremment.addEventListener("click", decrementSession);
breakIncremment.addEventListener("click", incrementBreak);
sessionIncremment.addEventListener("click", incrementSession);

// reset button
reset.addEventListener("click", resetIt);

// play/pause button
startStop.addEventListener("click", playOrPause);

/*                               functions                             */

// up-down length adjust functions
function decrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value >= 0) { breakLength.innerHTML = value - 1; }
}

function decrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value >= 0) { sessionLength.innerHTML = value - 1; }
}

function incrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value < 60) { breakLength.innerHTML = value + 1; }
}

function incrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value < 60) { sessionLength.innerHTML = value + 1; }
}

// reset button
function resetIt() {
  breakLength.innerHTML = 5;
  sessionLength.innerHTML = 25;
  timer.innerHTML = '25:00';
}

// play/pause button
function playOrPause() {
  let time = timer.innerHTML.split('');
  setInterval(function () {
    var minutes = parseInt(time[0] + time[1]);
    var seconds = parseInt(time[3] + time[4]);
    timer.innerHTML = minutes + seconds;
  }, 1000);
}