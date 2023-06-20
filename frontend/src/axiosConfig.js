import axios from "axios";
import packageJson from "../package.json";

const instance = axios.create({
  baseURL: packageJson.proxy,
  headers: {
    Authorization: "AUTH TOKEN",
  },
});

export default instance;
