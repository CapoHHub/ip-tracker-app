// FIND YOUR IP AND LOCATION WHEN OPEN WEBSITE

let inputField = document.querySelector(".input-field");
let enterBtn = document.querySelector(".enter-btn");
let ipAddress = document.querySelector(".ip");
let locatioM = document.querySelector(".location");
let timeZone = document.querySelector(".time-zone");
let isp = document.querySelector(".isp");

enterBtn.addEventListener("click", () => {
  if (inputField.value === "") {
    alert("Search for an IP address first!");
  } else {
    // GET IP ADDRESS AND LOCATION
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_8Y9wyUdzklq4yvF4m2aG6B7tm072h&ipAddress=${inputField.value}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("Invalid IP address!");
          inputField.value = "";
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.location);
        var map = L.map("map").setView(
          [data.location.lat, data.location.lng],
          13
        );

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(map);

        var marker = L.marker([data.location.lat, data.location.lng]).addTo(
          map
        );
      });

    // INITIALIZE THE MAP
  }
});
