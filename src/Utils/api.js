const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchDataFromApi = async (endpoint) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMDB_BASE_URL}${endpoint}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
