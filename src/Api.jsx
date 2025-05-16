import axios from "axios";

export const getCountries = async () => {
  try {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [];
  }
};

export const getCovidHistory = async (countryCode) => {
  try {
    const res = await axios.get(
      `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch COVID history:", error);
    return null;
  }
};
