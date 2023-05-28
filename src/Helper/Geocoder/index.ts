export const geocoderFunction = async (address: string) => {
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
        if (data.length === 0) {
            throw new Error("No results found");
        }

        return data
    } catch (error) {
        console.error(error);

    }

}