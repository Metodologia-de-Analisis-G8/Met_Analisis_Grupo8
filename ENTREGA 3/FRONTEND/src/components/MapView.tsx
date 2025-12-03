import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

type Props = {
  lat: number;
  lon: number;
  title?: string;
};

const defaultIcon = L.icon({
  iconUrl: "/img/marker-icon.png", // puedes usar public/marker-icon.png o usar el default de leaflet
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export function MapView({ lat, lon, title }: Props) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.log("Geolocation denied or error:", err)
    );
  }, []);

  const center: [number, number] = [lat, lon];

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden">
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
