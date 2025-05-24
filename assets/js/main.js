"use strict";

// Email validation function
function validateEmail(email) {
  // Source: https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate functions for Input
function validateForm() {
  // GET THE VALUES FROM THE INPUT FIELDS
  let inputName = document.querySelector("#name").value;
  let inputAge = document.querySelector("#age").value;
  let inputAddress = document.querySelector("#address").value;
  let inputEmail = document.querySelector("#email").value;

  // VALIDATE THE INPUTS
  if (inputName == "") {
    alert("Please Enter Your Name");
    return false;
  }

  if (inputAge == "") {
    alert("Please Enter Your Age");
    return false;
  } else if (inputAge < 1) {
    alert("Please Enter a Valid Age");
    return false;
  }

  if (inputAddress == "") {
    alert("Address is Required");
    return false;
  }

  if (inputEmail == "") {
    alert("Email is Required");
    return false;
  } else if (!inputEmail.includes("@")) {
    alert("Please Enter a Valid Email");
    return false;
  }

  return true;
}

function showData() {
  let personsList;

  // This is a usage of local storage
  if (localStorage.getItem("personsList") == null) {
    personsList = [];
  } else {
    // This is a usage of local storage
    personsList = JSON.parse(localStorage.getItem("personsList"));
  }

  let html = "";

  personsList.forEach(function (el, index) {
    html += "<tr>";
    html += "<td>" + el.name + "</td>";
    html += "<td>" + el.age + "</td>";
    html += "<td>" + el.address + "</td>";
    html += "<td>" + el.email + "</td>";
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="button button--delete">Delete</button> <button onclick="updateData(' +
      index +
      ')" class="button button--primary">Edit</button></td>';
    html += "</tr>";
  });

  document.querySelector("#tableId tbody").innerHTML = html;
}

// Loads the data from local storage when page loads
document.addEventListener("DOMContentLoaded", function () {
  showData();
});

// Function to add data.
function submitData() {
  if (validateForm() == true) {
    let inputName = document.querySelector("#name").value;
    let inputAge = document.querySelector("#age").value;
    let inputAddress = document.querySelector("#address").value;
    let inputEmail = document.querySelector("#email").value;

    let personsList;

    // This is a usage of local storage
    if (localStorage.getItem("personsList") == null) {
      personsList = [];
    } else {
      // This is a usage of local storage
      personsList = JSON.parse(localStorage.getItem("personsList"));
    }

    personsList.push({
      name: inputName,
      age: inputAge,
      address: inputAddress,
      email: inputEmail,
    });

    localStorage.setItem("personsList", JSON.stringify(personsList));
    showData();

    // CLEAR INPUT FIELDS AFTER SUBMITTING
    document.querySelector("#name").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#address").value = "";
    document.querySelector("#email").value = "";
  }
}

// Function to delete data
function deleteData(index) {
  let personsList = JSON.parse(localStorage.getItem("personsList"));
  personsList.splice(index, 1);
  localStorage.setItem("personsList", JSON.stringify(personsList));
  showData();
}

// Function to update data (basic implementation)
function updateData(index) {
  let personsList = JSON.parse(localStorage.getItem("personsList"));
  let person = personsList[index];

  // Fill form with existing data
  document.querySelector("#name").value = person.name;
  document.querySelector("#age").value = person.age;
  document.querySelector("#address").value = person.address;
  document.querySelector("#email").value = person.email;

  // Remove the old entry
  deleteData(index);
}
