import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export interface IMap {
  latitude: number;
  longitude: number;
  address: string;
}

const Map: React.FC<IMap> = (props: IMap) => {
  const { latitude, longitude } = props;
  const [position, setPosition] = useState<[number, number]>([
    latitude,
    longitude,
  ]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  const icon = new L.Icon({
    iconUrl: "/assets/marker-icon-2x.png",
    iconAnchor: [12, 31],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowUrl: "/assets/marker-shadow.png",
    shadowSize: [30, 30],
    shadowAnchor: [12, 41],
  });

  return (
    <MapContainer center={position} zoom={10} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker icon={icon} position={position}></Marker>
    </MapContainer>
  );
};

export default Map;
