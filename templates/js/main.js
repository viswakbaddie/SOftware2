'use strict';
/* 1. show map using Leaflet library. (L comes from the Leaflet library) */
let value = 0
const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7.5);

// global variables

// icons

// form for player name

// function to fetch data from API
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('invalid server name/url');
  const data = response.json();
  return data;
}

// function to update game status
function updateStatus(status){
  document.querySelector('#player-name').innerHTML = `${status.name}`
  document.querySelector('#consumed').innerHTML = `${status.co2.consumed}`
  document.querySelector('#budget').innerHTML = `${status.co2.budget}`

}

// function to show weather at selected airport
function showWeather(airport){
  document.querySelector('#airport-name').innerHTML = `:${airport.name}`
  document.querySelector('#temprature').innerHTML = `${airport.weather.temp}°C`
  document.querySelector('#wind-speed').innerHTML = `${airport.weather.wind.speed}m/s`
}

// function to check if any goals have been reached

// function to update goal data and goal table in UI
async function gold(){
  const response = await fetch('http://127.0.0.1:5000/gold');
  const data = await response.json();
  alert(data.new)


  document.querySelector('#gold').innerHTML = data.gold;
  if(data.gold>500){
    window.location.href = "http://localhost:63342/SOftware2/templates/win.html";
  }
  document.querySelector('#consumed').innerHTML = `${data.used}`
  document.querySelector('#budget').innerHTML = `${data.remaining}`
  if(data.remaining<0){
    window.location.href = "http://localhost:63342/SOftware2/templates/loose.html";
  }

}

// function to check if game is over


// function to set up game
// this is the main function that creates the game and calls the other functions
async function gameSetup() {
  try {
    const gameData = await getData('testdata/newgame.json');
    updateStatus(gameData.status)
    gold()
    console.log(gameData);
    for (let airport of gameData.location) {
      let myIcon = L.icon({
        iconUrl: 'img/my-icon.png',
        iconSize: [30, 40],
        iconAnchor: [30, 40],
        popupAnchor: [-15, -14],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
      });
      let myIcom = L.icon({
        iconUrl: 'img/my-icom.png',
        iconSize: [30, 40],
        iconAnchor: [30, 40],
        popupAnchor: [-15, -14],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [0, 0],
        shadowAnchor: [0, 0],
      });
      let marker

      if (airport.active) {
        showWeather(airport)
        marker = L.marker([airport.latitude, airport.longitude],
          {icon: myIcom}).addTo(map);
        marker.bindPopup(`You are here:<b>${airport.name}</b>`).openPopup();

      } else {
        marker = L.marker([airport.latitude, airport.longitude],
          {icon: myIcon}).addTo(map);
        const popupContent = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.innerHTML = airport.name;
        popupContent.append(h4);
        const goButton = document.createElement('button');
        goButton.classList.add('button');
        goButton.innerHTML = 'Fly here!';
        popupContent.append(goButton);
        const p = document.createElement('p');
        p.innerHTML = `Distance is ${airport.distance} km`;
        popupContent.append(p);
        marker.bindPopup(popupContent);

      }
    }
  } catch (error) {
    console.log(error.message);
  }

}

gameSetup();

// event listener to hide goal splash
