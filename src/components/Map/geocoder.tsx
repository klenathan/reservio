import { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./map"), { ssr: false });

const Geocoder = () => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const handleGeocode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1&limit=1`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.length === 0) {
        throw new Error("No results found");
      }

      const { lat, lon } = data[0];
      setLat(parseFloat(lat));
      setLng(parseFloat(lon));
    } catch (error) {
      console.error(error);
    }
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
      {lat !== null && lng !== null && <Map latitude={lat} longitude={lng} />}
    </div>
  );
};

export default Geocoder;
