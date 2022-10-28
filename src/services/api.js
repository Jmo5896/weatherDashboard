import axios from "axios";
import usCities from "./usCities.json";
import states from "./states.json";

const buildTHeThing = (arr1, arr2) => {
  const newOutput = [...arr1, ...arr2];
  const shuffle = newOutput.shift();
  newOutput.push(shuffle);
  return newOutput.join("");
};

const url = `https://api.openweathermap.org/data`;

const API = {
  parser: buildTHeThing,
  getWeather: async ({ api_key, lat, lon }) => {
    return await axios.get(
      `${url}/3.0/onecall?units=imperial&appid=${api_key}&lat=${lat}&lon=${lon}`
    );
  },
  getForecast: async ({ api_key, lat, lon }) => {
    return await axios.get(
      `${url}/2.5/forecast?units=imperial&appid=${api_key}&lat=${lat}&lon=${lon}`
    );
  },
  getCities: (state) => {
    return usCities.filter((obj) => obj.state === state);
  },
  getStates: () => {
    return states;
  },
};

export default API;
