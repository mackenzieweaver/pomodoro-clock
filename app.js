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
const alarm = document.getElementById("beep"); // audio element
const timerLabel = document.getElementById("timer-label");

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
function incrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value < 60) { breakLength.innerHTML = value + 1; }
}
function decrementBreak() {
  let value = parseInt(breakLength.innerHTML);
  if (value > 1) { breakLength.innerHTML = value - 1; }
}

function incrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value < 60) { sessionLength.innerHTML = value + 1; }
  if (value > 10) {
    timer.innerHTML = sessionLength.innerHTML + ':' + '00';
  } else {
    timer.innerHTML = "0" + sessionLength.innerHTML + ':' + '00';
  }
  stopTimer();
}
function decrementSession() {
  let value = parseInt(sessionLength.innerHTML);
  if (value > 1) { sessionLength.innerHTML = value - 1; }
  if (value > 10) {
    timer.innerHTML = sessionLength.innerHTML + ':' + '00';
  } else {
    timer.innerHTML = "0" + sessionLength.innerHTML + ':' + '00';
  }
  stopTimer();
}

// reset button
function resetIt() {
  alarm.load();
  stopTimer();
  breakLength.innerHTML = 5;
  sessionLength.innerHTML = 25;
  timerLabel.innerHTML = 'Session';
  timer.innerHTML = '25:00';
  startStop.addEventListener("click", playbutton);
}

function getTime() {
  // get displayed time
  let time = timer.innerHTML.split('');
  // convert to number from string
  let minutes = parseInt(time[0] + time[1]);
  let seconds = parseInt(time[3] + time[4]);
  // convert minutes to seconds and add seconds then subtract one to count down
  let total = (minutes * 60 + seconds) - 1;
  // split total amount of seconds into minutes
  minutes = Math.floor(total / 60);
  // and seconds
  seconds = Math.floor(total % 60);
  // add 0 padding
  minutes < 10 ? minutes = "0" + parseInt(minutes) : minutes = minutes;
  seconds < 10 ? seconds = "0" + parseInt(seconds) : seconds = seconds;
  // combine into one string to display
  timer.innerHTML = minutes + ":" + seconds;
  if (total === 0) {
    alarm.play();
    stopTimer();
    // disable play/pause while at 00:00
    startStop.removeEventListener("click", playbutton);
    alarm.onended = () => {
      // when the audio finishes
      timerLabel.innerHTML === 'Session' ? startBreak() : startSession();
      // enable play/pause after the time left has been updated
      startStop.addEventListener("click", playbutton);
      playbutton(); // didn't use 'startTimer' so that a new timerID gets set
    }
  }
}

let timerID = 0;
function playbutton() {
  console.log(timerID);
  // depending on the playbutton icon
  if (startStop.firstChild.classList.value === "fas fa-play") {
    timerID = startTimer();
  } else {
    stopTimer();
  }
}

let startTimer = function () {
  // switch icon from play to pause
  startStop.firstChild.classList.remove('fa-play');
  startStop.firstChild.classList.add('fa-pause');
  return setInterval(getTime, 5); // THIS IS WHERE THE MAGIC HAPPENS
}

function stopTimer() {
  // switch icon from pause to play
  startStop.firstChild.classList.add('fa-play');
  startStop.firstChild.classList.remove('fa-pause');
  clearInterval(timerID);
}

function startBreak() {
  timerLabel.innerHTML = 'Break';
  if (breakLength.innerHTML > 10) {
    timer.innerHTML = breakLength.innerHTML + ':' + '00';
  } else {
    timer.innerHTML = "0" + breakLength.innerHTML + ':' + '00';
  }
}

function startSession() {
  timerLabel.innerHTML = 'Session';
  if (sessionLength.innerHTML > 10) {
    timer.innerHTML = sessionLength.innerHTML + ':' + '00';
  } else {
    timer.innerHTML = "0" + sessionLength.innerHTML + ':' + '00';
  }
}