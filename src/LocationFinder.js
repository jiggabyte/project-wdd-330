import { createElement } from './utils';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl
// import dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from .env file
// dotenv.config();

// Access environment variables
//const API_KEY = process.env.API_KEY;
//console.log(process.env);
//alert(api_key);

const API_KEY = 'pk.eyJ1IjoiamlnZ2FieXRlIiwiYSI6ImNtN2NnNTJiNDA4ZWYybHNkMWozYW9kYmUifQ.jHEMNlpxfTd2HrW1zERzWQ';

// Load JSON data
async function loadLocations() {
  try {

    const response = await fetch('./data/locations.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading locations:', error);
    return [];
  }
}

export default async function LocationFinder() {

 // const locations = await loadLocations(); // Load locations from JSON

 const locations = JSON.parse(`
  [
    {
        "name": "New York",
        "latitude": 40.7128,
        "longitude": -74.006
    },
    {
        "name": "London",
        "latitude": 51.5074,
        "longitude": -0.1278
    },
    {
        "name": "Tokyo",
        "latitude": 35.6895,
        "longitude": 139.6917
    },
    {
        "name": "Sydney",
        "latitude": -33.8688,
        "longitude": 151.2093
    },
    {
        "name": "Paris",
        "latitude": 48.8566,
        "longitude": 2.3522
    }
]
  `);

  // Create map container
  const mapContainer = createElement('div', { id: 'map' });
  mapContainer.style.height = '500px'; // Set a fixed height for the map

  // Create buttons
  const locateButton = createElement('button', {
    textContent: 'LOCATE LOCATION',
    className: 'locate-button',
  });
  const saveButton = createElement('button', {
    textContent: 'SAVE LOCATION',
    className: 'save-button',
  });

  const searchInput = createElement('input', {
    type: 'text',
    placeholder: 'Search for a location...',
    className: 'search-input',
  });

  const searchButton = createElement('button', {
    textContent: 'SEARCH',
    className: 'search-button',
  });

  // Create controls container
  const controls = createElement('div', { className: 'controls' }, [
    locateButton,
    saveButton,
    searchInput,
    searchButton
  ]);

  // Append map and controls to the DOM
  const mapRoot = document.getElementById('map');
  const controlsRoot = document.getElementById('controls');

  if (mapRoot && controlsRoot) {
    mapRoot.appendChild(mapContainer);
    controlsRoot.appendChild(controls);
  }

  // Initialize Mapbox
  mapboxgl.accessToken = API_KEY; // Replace with your Mapbox access token
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0], // Default center
    zoom: 1, // Default zoom
  });

  // Geolocation API
  locateButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
        map.setZoom(14);

        // Add a marker
        new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      },
      (error) => {
        alert('Unable to retrieve your location.');
        console.error(error);
      }
    );
  });

    // Search functionality
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) {
        alert('Please enter a location to search.');
        return;
      }
  
      const foundLocation = locations.find(
        (location) => location.name.toLowerCase() === searchTerm
      );
  
      if (foundLocation) {
        const { latitude, longitude } = foundLocation;
        map.setCenter([longitude, latitude]);
        map.setZoom(14);
  
        // Add a marker
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setText(foundLocation.name))
          .addTo(map);
      } else {
        alert(`Location "${searchTerm}" not found.`);
      }
    });

    searchInput.addEventListener('focus', () => {
      document.querySelector(".search-button").textContent = "Search City";
    });

    
  // Save Location to Local Storage
  saveButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locations = JSON.parse(localStorage.getItem('locations')) || [];
        locations.push({ latitude, longitude });
        localStorage.setItem('locations', JSON.stringify(locations));
        alert('Location saved!', JSON.stringify(locations));
      },
      (error) => {
        alert('Unable to retrieve your location.');
        console.error(error);
      }
    );
  });
}