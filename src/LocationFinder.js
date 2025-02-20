import { createElement } from './utils';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl

export default function LocationFinder() {
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

  // Create controls container
  const controls = createElement('div', { className: 'controls' }, [
    locateButton,
    saveButton,
  ]);

  // Append map and controls to the DOM
  const mapRoot = document.getElementById('map');
  const controlsRoot = document.getElementById('controls');

  if (mapRoot && controlsRoot) {
    mapRoot.appendChild(mapContainer);
    controlsRoot.appendChild(controls);
  }

  // Initialize Mapbox
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token
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
        alert('Location saved!');
      },
      (error) => {
        alert('Unable to retrieve your location.');
        console.error(error);
      }
    );
  });
}