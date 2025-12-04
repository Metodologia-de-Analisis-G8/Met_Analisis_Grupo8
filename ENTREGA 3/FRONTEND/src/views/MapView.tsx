import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function MapView() {
  const { lat, lon, title } = useParams();

  const latitude = parseFloat(lat ?? "0");
  const longitude = parseFloat(lon ?? "0");

  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.log("Geolocation error:", err)
    );
  }, []);

  const center: [number, number] = [latitude, longitude];

  return (
    <div className="h-screen w-full">
      <MapContainer center={center} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={center} icon={defaultIcon}>
          <Popup>{title || "Destino"}</Popup>
        </Marker>

        {userPos && (
          <>
            <Marker position={userPos}>
              <Popup>Tu ubicación</Popup>
            </Marker>

            <Polyline positions={[userPos, center]} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
