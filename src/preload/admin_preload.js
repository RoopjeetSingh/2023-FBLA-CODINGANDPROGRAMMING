const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

// Function to read from a JSON file
function readFromJSON(file) {
  // Parse the JSON file and return it
  return JSON.parse(fs.readFileSync(file));
}

// Function to write to a JSON file
function writeToJSON(file, data) {
  // Write the data to the file using fs.writeFileSync
  fs.writeFileSync(file, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
    flag: "w",
  });
  // Log a message to the console indicating that data has been written to the file
  console.log(`Wrote ${data} to ${file}`);
}

// Function to toggle the events window
function toggleEvents() {
  // Select the events window
  let eventsWindow = document.querySelector(".events__holder");
  // Update the display property of the events window
  eventsWindow.style.display =
    eventsWindow.style.display == "none" ? "block" : "none";
}

// Function to toggle the accounts window
function toggleAccounts() {
  // Select the accounts window
  let accountsWindow = document.querySelector(".accounts__holder");
  // Update the display property of the accounts window
  accountsWindow.style.display =
    accountsWindow.style.display == "none" ? "block" : "none";
}

// Function to update the events data
function updateEvents() {
  // Fetch the events data from the JSON file
  fetch(path.join(__dirname, "../database/events.json"))
    .then(function (response) {
      // Convert the response to JSON format
      return response.json();
    })
    // Use the events data to update the events placeholder
    .then(function (events) {
      // Select the events placeholder
      let placeholder = document.querySelector(".events__output");
      // Initialize the output variable
      let output = "";
      // Loop through the events and build the output string
      for (event of events) {
        output += `
               <tr>
                  <td>${event.event_name}</td>
                  <td>${event.event_description}</td>
                  <td>${event.prize}</td>
                  <td>${event.start_date}</td>
                  <td>${event.end_date}</td>
                  <td>
                     <div class="button__bar">
                        <input type="button" onclick="editEvent()" value="Edit">
                        <input type="button" onclick="deleteEvent()" value="Delete">
                     </div>
                  </td>
               </tr>
            `
         }
        // Update the innerHTML of the events placeholder
        placeholder.innerHTML = output;
      }
    });
}

// Call the updateEvents function to initialize the events data
updateEvents();

// Function to create a new event
function createNewEvent() {
  // Read the current events from a JSON file
  let currentEvents = readFromJSON(
    path.join(__dirname, "../database/events.json")
  );

  // Get the event name, description, prize, start date, and end date from the input fields
  let eventName = document.querySelector(".event__name").value;
  let eventDescription = document.querySelector(".event__description").value;
  let prize = document.querySelector(".prize").value;
  let startDate = document.querySelector(".start__date").value;
  let endDate = document.querySelector(".end__date").value;

  // Check if any of the fields are empty
  if (
    eventName === "" ||
    eventDescription === "" ||
    prize === "" ||
    startDate === "" ||
    endDate === ""
  ) {
    // If any field is empty, show an alert and return
    alert("Empty fields present");
    return;
  } else if (endDate < startDate) {
    // If the end date is earlier than the start date, show an alert and return
    alert("Start date is later than end date");
    return;
  }

  // Split the start and end dates into separate parts (month, day, and year)
  startDate = startDate.split("-");
  endDate = endDate.split("-");

  // Reformat the start and end dates
  startDate = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
  endDate = `${endDate[1]}/${endDate[2]}/${endDate[0]}`;

  // Define a template for a new event
  let eventTemplate = {
    event_name: eventName,
    event_description: eventDescription,
    prize: prize,
    start_date: startDate,
    end_date: endDate,
    participants: [],
  };

  // Add the new event to the list of current events
  currentEvents.push(eventTemplate);

  // Write the updated list of events to the JSON file
  writeToJSON(path.join(__dirname, "../database/events.json"), currentEvents);

  // Update the events on the page
  updateEvents();
}

// Function to edit an existing event
function editEvent() {

}

// Function to delete an existing event
function deleteEvent() {

}
