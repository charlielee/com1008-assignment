/*!
  JavaScript for Contact Page
  Author: Charles Lee
  Created: 04/12/16
*/

var lastSubmission = document.getElementById("last-submission"),
    contactForm    = document.getElementById("contact-form"),
    submitButton   = document.getElementById("submit"),
    date           = new Date(),
    curTime        = date.toLocaleTimeString().substr(0, 5);

submitButton.addEventListener("click", addSubmission);

function addSubmission() {
  if (contactForm.checkValidity()) {
    sessionStorage.setItem("last_submission", curTime);
    console.info("Successful form submission");
  } else {
    console.error("Failed form submission");
  }
}

function getLastSubmission() {
  if (sessionStorage.getItem("last_submission")) {
    /* Remove "hidden" class from last submission box */
    if (lastSubmission.classList.contains("hidden")) {
      lastSubmission.classList.remove("hidden")
    }

    /* Display a message confirming a form submission has been made */
    lastSubmission.innerHTML = "<h3>Thank you for your feedback!</h3>" +
      "<p>You successfully submitted a form at " + sessionStorage.getItem("last_submission") + ". We try to respond to all queries within 2 working days.</p>" +
      "<p>Please feel free to submit another form if you have any further queries.</p>";
  } else {
    /* Add "hidden" class to last submission box */
    if (!lastSubmission.classList.contains("hidden")) {
      lastSubmission.classList.add("hidden");
    }
  }
}

window.onload = getLastSubmission;