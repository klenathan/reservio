import {useState} from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import {geocoderFunction} from "@/Helper/Geocoder";

const Map = dynamic(() => import("./Map"), {ssr: false});

const Geocoder = () => {
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);

    const handleGeocode = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: any = await geocoderFunction(address);
        const {lat, lon} = data[0];

        setLat(parseFloat(lat));
        setLng(parseFloat(lon));
    };

    return (
        <div>
            <form onSubmit={handleGeocode}>
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {lat !== null && lng !== null &&
                <div className={'relative w-full h-80 lg:w-3/4 lg:h-96 m-auto z-0'}>
                    <Map latitude={lat} longitude={lng} scrollWheelZoom={true}/>
                </div>}
        </div>
    );
};

export default Geocoder;
