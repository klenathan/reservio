import L from "leaflet";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useEffect, useRef, useState} from "react";

export interface IMap {
    latitude: number;
    longitude: number;
}

const Map: React.FC<IMap> = (props: IMap) => {
    const {latitude, longitude} = props;
    const [position, setPosition] = useState<[number, number]>([
        latitude,
        longitude,
    ]);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        setPosition([latitude, longitude]);
    }, [latitude, longitude]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, mapRef.current.getZoom(), {
                duration: 1,
            });
        }
    }, [position]);

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
        <MapContainer
            center={position}
            zoom={100}
            className={'w-full h-full'} // The div container must have relative
            whenReady={() => {
                if (mapRef.current) {
                    mapRef.current.flyTo(position, mapRef.current.getZoom(), {
                        // duration: 10,
                    });
                }
            }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker icon={icon} position={position}></Marker>
        </MapContainer>
    );
};

export default Map;