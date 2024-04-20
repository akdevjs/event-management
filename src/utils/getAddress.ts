import axios from "axios";

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          countrycodes: "PK",
          addressdetails: 1, // Include detailed address information
        },
      }
    );

    if (response.data.address) {
      const { address } = response.data;
      const sector =
        address.neighbourhood || address.suburb || address.county || "";
      const city = address.city || address.town || address.state;
      const country = address.country || "";
      return `${sector ? sector + ", " : ""} ${city}, ${country} `;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

export default getAddressFromCoordinates;
