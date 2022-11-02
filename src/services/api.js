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
  dateFormater: (date) => {
    const currentDate = new Date(date * 1000);
    return `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  },
  getWeather: async ({ api_key, lat, lon }) => {
    return await axios.get(
      `${url}/3.0/onecall?units=imperial&appid=${api_key}&lat=${lat}&lon=${lon}`
    );
  },
  getCities: (state) => {
    return [
      {
        label: "Select...",
        state: "",
        value: false,
      },
      ...usCities.filter((obj) => obj.state === state),
    ];
  },
  getStates: () => {
    return states;
  },
};

export default API;
