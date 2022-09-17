// GLOBAL VARIABLES

let inputField = document.querySelector(".input-field");
let enterBtn = document.querySelector(".enter-btn");
let ipAddress = document.querySelector(".ip");
let locationVar = document.querySelector(".location");
let timeZone = document.querySelector(".time-zone");
let isp = document.querySelector(".isp");
var map = undefined;
var marker = undefined;
var popup = undefined;

// FIND YOUR IP AND LOCATION WHEN OPEN WEBSITE

fetch(
  `https://geo.ipify.org/api/v2/country,city?apiKey=at_8Y9wyUdzklq4yvF4m2aG6B7tm072h`
)
  .then((response) => response.json())
  .then((data) => {
    // INITIALIZE THE MAP

    map = L.map("map").setView([data.location.lat, data.location.lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    marker = L.marker([data.location.lat, data.location.lng]).addTo(map);

    popup = L.popup()
      .setLatLng([data.location.lat, data.location.lng])
      .setContent("Your Position")
      .openOn(map);

    // PRINT INFO

    ipAddress.innerHTML = data.ip;
    locationVar.innerHTML = data.location.city;
    timeZone.innerHTML = data.location.timezone;
    isp.innerHTML = data.isp;
  });

// FIND INFORMATION FOR A SEARCHED IP ADDRESS OR DOMAIN

enterBtn.addEventListener("click", () => {
  if (inputField.value === "") {
    alert("Search for an IP address first!");
  } else {
    // GET IP ADDRESS AND LOCATION
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_8Y9wyUdzklq4yvF4m2aG6B7tm072h&ipAddress=${inputField.value}&domain=${inputField.value}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("Invalid IP address!");
          inputField.value = "";
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // INITIALIZE THE MAP

        map.setView([data.location.lat, data.location.lng], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(map);

        L.marker([data.location.lat, data.location.lng]).addTo(map);

        // PRINT INFO

        ipAddress.innerHTML = data.ip;
        locationVar.innerHTML = data.location.city;
        timeZone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;
      });

    inputField.value = "";
  }
});
