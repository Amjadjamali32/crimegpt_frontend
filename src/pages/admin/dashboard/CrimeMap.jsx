import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

// Custom component to handle map bounds
const MapBounds = ({ reportLocations }) => {
  const map = useMap(); // Access the map instance

  // Calculate bounds for all markers
  const bounds = reportLocations
    .filter((report) => report.userLocation) // Filter out reports without userLocation
    .map((report) => [report.userLocation.latitude, report.userLocation.longitude]);

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] }); // Fit the map to the bounds
  }

  return null; // This component doesn't render anything
};

// Define a custom red marker icon
const redMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // Size of the shadow
});

const CrimeMap = ({ reportLocations }) => {
  // Default center for the map (you can adjust this)
  const center = [51.505, -0.09];

  return (
    <div style={{ zIndex: 1 }} className="relative rounded-sm border border-custom-teal mx-2 sm:ms-[38%] sm:w-[58%] md:ms-[30%] md:w-[68%] lg:ms-[23%] lg:w-[76%] xl:ms-[21%] xl:w-[78%]">
      <MapContainer center={center} zoom={10} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {reportLocations
          .filter((report) => report.userLocation) 
          .map((report, index) => (
            <Marker
              key={index}
              position={[report.userLocation.latitude, report.userLocation.longitude]}
              icon={redMarkerIcon} 
            >
              <Popup>
                <div>
                  <h3>Crime Details</h3>
                  <p><strong>Type:</strong> {report.incident_type || "Unknown"}</p>
                  <p><strong>Status:</strong> {report.reportStatus}</p>
                  <p><strong>Date:</strong> {new Date(report._id).toLocaleDateString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        <MapBounds reportLocations={reportLocations} /> 
      </MapContainer>
    </div>
  );
};

export default CrimeMap;

// // GOOGLE MAPS WITH API KEY
// import { useEffect, useRef, useState } from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };
// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// // Move 'libraries' outside the component
// const libraries = ['places', 'geometry'];

// const CrimeMap = ({ reportLocations = [] }) => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey,
//     libraries, // Use the static 'libraries' variable
//   });

//   const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco fallback
//   const mapRef = useRef(null);
//   const [policeStations, setPoliceStations] = useState([]);

//   // Function to fetch police stations near a location
//   const fetchPoliceStations = (location) => {
//     if (!window.google || !mapRef.current) return;

//     const service = new window.google.maps.places.PlacesService(mapRef.current);
//     const request = {
//       location: location,
//       radius: 5000, // Search within 5km radius
//       type: "police",
//     };

//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         setPoliceStations(results);
//       }
//     });
//   };

//   useEffect(() => {
//     if (isLoaded && mapRef.current && reportLocations.length > 0 && window.google) {
//       const bounds = new window.google.maps.LatLngBounds();
//       reportLocations.forEach((report) => {
//         if (report?.userLocation?.latitude && report?.userLocation?.longitude) {
//           bounds.extend({
//             lat: report.userLocation.latitude,
//             lng: report.userLocation.longitude,
//           });
//         }
//       });
//       if (!bounds.isEmpty()) {
//         mapRef.current.fitBounds(bounds);
//         // Fetch police stations near the center of the bounds
//         fetchPoliceStations(bounds.getCenter());
//       }
//     }
//   }, [isLoaded, reportLocations]);

//   if (loadError) return <div>Error loading Google Maps!</div>;
//   if (!isLoaded) return <div>Loading Google Maps...</div>;

//   return (
//     <div className="relative rounded-sm border border-custom-teal mx-2 sm:ms-[38%] sm:w-[58%] md:ms-[30%] md:w-[68%] lg:ms-[23%] lg:w-[76%] xl:ms-[21%] xl:w-[78%]">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={defaultCenter}
//         onLoad={(map) => (mapRef.current = map)}
//       >
//         {/* Crime Markers */}
//         {reportLocations
//           .filter((report) => report?.userLocation?.latitude && report?.userLocation?.longitude)
//           .map((report, index) => (
//             <Marker
//               key={`crime-${index}`}
//               position={{
//                 lat: report.userLocation.latitude,
//                 lng: report.userLocation.longitude,
//               }}
//               icon={{ url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
//             />
//           ))}

//         {/* Police Station Markers */}
//         {policeStations.map((station, index) => (
//           <Marker
//             key={`police-${index}`}
//             position={{
//               lat: station.geometry.location.lat(),
//               lng: station.geometry.location.lng(),
//             }}
//             icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default CrimeMap;
