import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import Link from 'next/link';

// Dynamically load Leaflet with no SSR (Server-Side Rendering)
const Map = dynamic(() => import('leaflet'), { ssr: false });

const Page = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(''); // State for AI response

  const askAgronomist = async () => {
    // Show loading Swal
    Swal.fire({
      title: 'Processing...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    // Make the API call
    try {
      const response = await fetch('https://agritechbackend-c2cpd4gwbvg4cha7.eastus-01.azurewebsites.net/agronomist_ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: coordinates.lat,
          lon: coordinates.lng,
          prompt: question,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Close loading Swal and show the response
      Swal.close();
      setResponse(data.response); // Set the response in state
    } catch (error) {
      // Close loading Swal and show the error
      Swal.close();
      Swal.fire('Error', error.toString(), 'error');
    }
  };

  useEffect(() => {
    // Ensure Leaflet is only used in the browser
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      // Initialize the map
      const map = L.map('map').fitWorld();

      // Load a tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Locate the user
      map.locate({ setView: true, maxZoom: 16 });

      function onLocationFound(e) {
        const radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
          .bindPopup(`You are within ${radius} meters from this point`)
          .openPopup();

        L.circle(e.latlng, radius).addTo(map);

        const { lat, lng } = e.latlng;
        setCoordinates({ lat, lng });
      }

      function onLocationError(e) {
        alert(e.message);
      }

      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
    }
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Link href="/" className="absolute top-0 left-0 mt-2 ml-2">
        <ArrowLeftIcon className="text-blue-500" style={{ height: '20px', width: '20px' }} />
      </Link>
      <h1 className="text-3xl font-bold mb-6">Agronomist</h1>
      <div id="map" style={{ height: '300px', width: '100%' }}></div>
      
      <div style={{ padding: '10px' }}>
        <h3>Current Coordinates:</h3>
        <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lng}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Ask the agronomist..." 
            style={{ 
              width: '80%', 
              height: '100px', 
              padding: '10px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
          />
          <button 
            onClick={askAgronomist} 
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: 'none', 
              backgroundColor: '#007BFF', 
              color: 'white', 
              cursor: 'pointer' 
            }}
          >
            Ask the Agronomist
          </button>
        </div>
        
        {/* Display the AI response */}
        {response && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4>AI Response:</h4>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
