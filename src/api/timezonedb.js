import axios from "axios";

const TZ_API_KEY = REACT_APP_TIMEZONEDB_API_KEY;
const api = axios.create({
  baseURL: "http://api.timezonedb.com/v2.1"
  // ?key=KEY&format=json&by=position&lat=52.25&lng=21&time=1589516418
  // baseURL: "http://api.timezonedb.com/v2.1/get-time-zone?key=KEY&format=json&by=position&lat=52.25&lng=21&time=1589516418"
});

export default function(route, params) {
  return api.get(route, {
    params: {
      key: TZ_API_KEY,
      ...params
    }
  });
}
