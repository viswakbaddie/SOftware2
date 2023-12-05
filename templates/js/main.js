'use strict';
/* 1. show map using Leaflet library. (L comes from the Leaflet library) */

const map = L.map('map', {tap: false});
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

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

// function to show weather at selected airport

// function to check if any goals have been reached

// function to update goal data and goal table in UI

// function to check if game is over

// function to set up game
// this is the main function that creates the game and calls the other functions
async function gameSetup() {
  try {
    const gameData = await getData('testdata/newgame.json');

    console.log(gameData);
    for(let airport of gameData.location){
      const marker = L.marker([airport.latitude,airport.longitude]).addTo(map)
      if(airport.active){
        marker.bindPopup(`You are here:<b>${airport.name}</b>`).openPopup();
      }


    }
  } catch (error) {
    console.log(error.message);
  }

}

gameSetup();

// event listener to hide goal splash
