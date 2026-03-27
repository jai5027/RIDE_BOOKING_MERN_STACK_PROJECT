const axios = require("axios");

const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
       process.env.GET_NOMINATIM,
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
              headers: {
        "User-Agent": "UBER_CLONE (jaisharma27868@gmail.com)", // IMPORTANT
      },
      }
    );
    if (!response.data.length) {
      throw new Error("Location not found");
    }

    const { lat, lon } = response.data[0];

    return {
      latitude: lat,
      longitude: lon,
    };
  } catch (error) {
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required')
    }
  try {
    // helper function (reuse geocoding)
    const geo = async (place) => {
      const response = await axios.get(
         process.env.GET_DISTANCE_TIME,
        {
          params: {
            q: place,
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "UBER_CLONE (jaisharma27868@email.com)",
          },
        }
      );
      if (!response.data.length) {
        throw new Error("Location not found");
      }

      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    };

    const start = await geo(origin);
    const end = await geo(destination);

    // OSRM route API
    const routeRes = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}`
    );

    const route = routeRes.data.routes[0];

    return {
      distance_in_km: (route.distance / 1000).toFixed(2),
      duration_in_min: (route.duration / 60).toFixed(2),
    };
  } catch (error) {
    throw error;
  }
};

const getSuggestions = async (input) => {
    if(!input){
        throw new Error('query is required')
    }
      try {

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,
          format: "json",
          addressdetails: 1,
          limit: 10, 
        },
        headers: {
          "User-Agent": "UBER_CLONE (jaishrma27868@gmail.com@email.com)",
        },
      }
    );
    
    return response.data.map((item) => ({
      display_name: item.display_name,
      latitude: item.lat,
      longitude: item.lon,
    }));
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getCoordinates,
  getDistanceTime,
  getSuggestions
};
