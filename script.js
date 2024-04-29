let alarms = [];

const alarmDiv = document.getElementById("alarms");

//function to get the current time and check if there is any alarm that equals current time
function updateClock() {
  const now = new Date();
  let currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const clockID = document.getElementById("clock-id");

  const ampm = currentHour >= 12 ? "PM" : "AM";

  currentHour = currentHour % 12;
  currentHour = currentHour ? currentHour : 12;

  clockID.innerText = `${currentHour}:${currentMinute}:${currentSecond} ${ampm}`;

  alarms.forEach((element) => {
    if (
      element.hour == currentHour &&
      element.minute == currentMinute &&
      element.second == currentSecond &&
      element.amp == ampm
    ) {
      alert("You have an alarm!");
    }
  });
}

//function to handle the form input and adding new alarm to the DOM and the alarms array
function alarmFormHandler(e) {
  e.preventDefault();
  let hour = document.getElementById("hour-input").value;
  let minute = document.getElementById("minute-input").value;
  let seconds = document.getElementById("second-input").value;
  let amp = document.getElementById("amp").value;
  amp = amp.toUpperCase();

  let hourObject = { hour: hour, minute: minute, second: seconds, amp: amp };

  alarms.push(hourObject);

  alarmDiv.innerHTML = "";

  //sorting the alarm array
  alarms.sort((a, b) => {
    if (a.amp !== b.amp) {
      return a.amp === "AM" ? -1 : 1;
    }
    if (a.hour !== b.hour) {
      return a.hour - b.hour;
    }
    if (a.minute !== b.minute) {
      return a.minute - b.minute;
    }
    if (a.second !== b.second) {
      return a.second - b.second;
    }
    return 0;
  });

  //Creating alarm element using DOM manipulation
  alarms.forEach((element) => {
    const node = document.createElement("h3");
    node.innerText = `${element.hour}:${element.minute}:${element.second} ${element.amp}`;
    const nodeDiv = document.createElement("div");
    const nodeButton = document.createElement("button");
    nodeButton.innerText = "Delete";
    nodeButton.classList.add("delete-button");
    nodeButton.onclick = function (event) {
      //Deleting the selected alarm from the alarms array
      const index = Array.from(nodeDiv.parentNode.children).indexOf(nodeDiv);
      alarms.splice(index, 1);
      deleteAlarm(nodeDiv);
    };
    nodeDiv.appendChild(node);
    nodeDiv.appendChild(nodeButton);
    nodeDiv.classList.add("nodeDiv");

    alarmDiv.appendChild(nodeDiv);
  });
}

//function to deleting the alarm element from the DOM
function deleteAlarm(theDiv) {
  theDiv.parentNode.removeChild(theDiv);
}

//handiling the submit event on the input form
form.addEventListener("submit", alarmFormHandler);

//setInterval method being used to update the clock and check for the alarms every second
setInterval(updateClock, 1000);
