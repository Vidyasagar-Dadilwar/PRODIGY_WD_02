// Variables to store the stopwatch state
let startTime;
let running = false;
let pausedTime = 0; // Variable to store the paused time
let lapTimes = [];
let lapId = 1;

// Function to start the stopwatch
function startStopwatch() {
  if (!running) {
    startTime = Date.now() - pausedTime; // Adjust start time based on paused time
    running = true;
    updateStopwatch();
  }
  else{
    alert('Stopwatch already running ....... ');
  }
}

// Function to pause the stopwatch
function pauseStopwatch() {
  if (running) {
    pausedTime = Date.now() - startTime; // Calculate paused time
    running = false;
  }
  else{
    alert('Please Start Stopwatch First......');
  }
}

// Function to reset the stopwatch
function resetStopwatch() {
  running = false;
  pausedTime = 0; // Reset paused time
  lapTimes = [];
  lapId = 1;
  updateStopwatch();
  updateLapTimes();
}

// Function to record lap time
function recordLap() {
  if (running) {
    const currentTime = Date.now();
    const lapTime = currentTime - startTime;
    lapTimes.push({ id: lapId, time: lapTime });
    lapId++;
    updateLapTimes();
  }
}

// Function to update the stopwatch display
function updateStopwatch() {
  const display = document.getElementById("display");
  let elapsedTime = pausedTime; // Use paused time if stopwatch is paused

  if (running) {
    elapsedTime = Date.now() - startTime;
  }

  const formattedTime = formatTime(elapsedTime);
  display.textContent = formattedTime;

  // Update every 10 milliseconds
  setTimeout(updateStopwatch, 10);
}

// Function to update the lap times display
function updateLapTimes() {
  const lapTimesContainer = document.getElementById("lapTimes");
  lapTimesContainer.innerHTML = ""; // Clear previous lap times

  if (lapTimes.length === 0) {
    lapTimesContainer.textContent = "No lap times recorded yet.";
    return;
  }

  // Create table element
  const table = document.createElement("table");
  table.classList.add("table", "w-full", "border", "border-gray-400", "mt-4");

  // Create table head
  const thead = document.createElement("thead");
  thead.classList.add("bg-gray-200", "sticky", "top-0");
  const headRow = document.createElement("tr");
  const headings = ["Lap", "Time"];
  headings.forEach((headingText) => {
    const th = document.createElement("th");
    th.classList.add("px-4", "py-2", "text-center", "font-semibold");
    th.textContent = headingText;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  lapTimes.forEach((lap) => {
    const lapTime = formatTime(lap.time);
    const row = document.createElement("tr");
    const lapCell = document.createElement("td");
    lapCell.textContent = lap.id;
    const timeCell = document.createElement("td");
    timeCell.textContent = lapTime;
    row.appendChild(lapCell);
    row.appendChild(timeCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Append table to lapTimesContainer
  lapTimesContainer.appendChild(table);

  // Check if the number of lap times exceeds 7
  if (lapTimes.length > 7) {
    // Set the max height and overflow-y to make the table scrollable
    lapTimesContainer.style.maxHeight = "200px";
    lapTimesContainer.style.overflowY = "auto";
  }
  lapTimesContainer.scrollTop = lapTimesContainer.scrollHeight;
}


// Function to format time in milliseconds to HH:MM:SS.MMM format
function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsRemaining = milliseconds % 1000;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(millisecondsRemaining).padStart(3, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}