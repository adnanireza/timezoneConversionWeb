import React, { useReducer, useEffect } from "react";
import axios from "axios";
import timeZoneGet from "../api/timezonedb";
import cities from "../data/simplemaps";
import { Orient, otherSide } from "../utils/orient";
import {
  isTimeValid,
  embedDateInTime,
  embedTimeInDate,
  timeIncBySec,
  isOverflow,
  isUnderflow,
  time2UnixConv
} from "../utils/time";

const reducer = (state, action) => {
  switch (action.type) {
    case "test":
      return { ...state, test: action.payload };
    case "set_date": // payload: date object
      return {
        ...state,
        [Orient.LEFT]: {
          ...state[Orient.LEFT],
          time: isTimeValid(state[Orient.LEFT].time)
            ? embedDateInTime(state[Orient.LEFT].time, action.payload)
            : state[Orient.LEFT].time
        },
        [Orient.RIGHT]: {
          ...state[Orient.RIGHT],
          time: isTimeValid(state[Orient.RIGHT].time)
            ? embedDateInTime(state[Orient.RIGHT].time, action.payload)
            : state[Orient.RIGHT].time
        },
        date: action.payload
      };
    case "set_city": // payload: {city: "string", orient: Orient obj}
      const res = {
        ...state,
        [action.payload.orient]: {
          ...state[action.payload.orient],
          city: action.payload.city
        },
        targetOrient: action.payload.orient
      };
      return res;
    case "set_time": // payload: {time: date obj, orient: Orient obj, overflow: "Next Day" or "Prev Day"}
      return {
        ...state,
        [action.payload.orient]: {
          ...state[action.payload.orient],
          time: action.payload.time,
          overflow: action.payload.overflow
        },
        [otherSide(action.payload.orient)]: {
          ...state[otherSide(action.payload.orient)],
          overflow: ""
        },
        targetOrient: otherSide(action.payload.orient)
      };
    default:
      return state;
  }
};

const Context = React.createContext();
const Provider = ({ children }) => {
  const citiesArray = Object.keys(cities);
  citiesArray.push("");
  const [state, dispatch] = useReducer(reducer, {
    test: "init",
    [Orient.LEFT]: {
      city: "",
      time: new Date(),
      overflow: "" // "Next Day", "Prev Day"
    },
    [Orient.RIGHT]: {
      city: "",
      time: new Date(),
      overflow: "" // "Next Day", "Prev Day"
    },
    date: new Date(),
    targetOrient: null,
    changeLeft: false // true: to change the left time. false: to change the right time
  });
  const readyLogic = (city1, time1, city2, time2, change) => {
    if (city1 && city2) {
      const valid1 = isTimeValid(time1);
      const valid2 = isTimeValid(time2);
      if (valid1 && valid2) {
        // All good.
        return true;
      } else if (!valid1 && !valid2) {
        return false;
      } else if (change.time && isTimeValid(change.time)) {
        return true;
      } else if (
        change.city &&
        isTimeValid(state[otherSide(change.orient)].time)
      ) {
        return true;
      } else if (
        change.date &&
        isTimeValid(state[otherSide(state.targetOrient)].time)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  const checkReady = change => {
    if (change.date) {
      return readyLogic(
        state[Orient.LEFT].city,
        state[Orient.LEFT].time,
        state[Orient.RIGHT].city,
        state[Orient.RIGHT].time,
        change
      );
    } else if (change.city) {
      const stateSide = otherSide(change.orient);
      return readyLogic(
        state[stateSide].city,
        state[stateSide].time,
        change.city,
        state[change.orient].time,
        change
      );
    } else if (change.time) {
      const stateSide = otherSide(change.orient);
      return readyLogic(
        state[stateSide].city,
        state[stateSide].time,
        state[change.orient].city,
        change.time,
        change
      );
    }
  };
  const convertTimeZone = (change, callback) => {
    if (!checkReady(change)) {
      callback(change.city ? change.city : change.time ? change.time : null);
      return;
    }
    const input = change.city
      ? otherSide(change.orient)
      : change.time
      ? change.orient
      : otherSide(state.targetOrient);
    const output = otherSide(input);
    const inputTime = change.city
      ? state[input].time
      : change.time
      ? change.time
      : embedDateInTime(state[input].time, change.date);
    axios
      .all([
        timeZoneGet("/get-time-zone", {
          format: "json",
          by: "position",
          lat: cities[state[input].city].lat,
          lng: cities[state[input].city].lng,
          time: time2UnixConv(inputTime)
        }),
        timeZoneGet("/get-time-zone", {
          format: "json",
          by: "position",
          lat: cities[change.city ? change.city : state[output].city].lat,
          lng: cities[change.city ? change.city : state[output].city].lng,
          time: time2UnixConv(inputTime)
        })
      ])
      .then(
        axios.spread((respIn, respOut) => {
          const diffSec = respOut.data.gmtOffset - respIn.data.gmtOffset;
          // Calculate overflow
          let overflow = "";
          if (isOverflow(inputTime, diffSec)) {
            overflow = "Next Day";
          } else if (isUnderflow(inputTime, diffSec)) {
            overflow = "Prev Day";
          }
          console.log(
            "overflow = " +
              overflow +
              ", Hours = " +
              inputTime.getHours() +
              ", diffHRs = " +
              Math.floor(diffSec / 3600) +
              ", input = " +
              input.description
          );
          callback(
            change.city ? change.city : change.time ? change.time : null
          );
          dispatch({
            type: "set_time",
            payload: {
              time: timeIncBySec(inputTime, diffSec),
              orient: output,
              overflow
            }
          });
        })
      )
      .catch(error => {
        console.log("**** Error ````");
        console.log(error);
      });
  };
  const setCity = (city, orient) => {
    convertTimeZone({ city, orient }, newCity =>
      dispatch({
        type: "set_city",
        payload: {
          city: newCity,
          orient
        }
      })
    );
  };
  const setTime = (time, orient) => {
    convertTimeZone({ time, orient }, newTime =>
      dispatch({
        type: "set_time",
        payload: { time: newTime, orient, overflow: "" }
      })
    );
  };
  return (
    <Context.Provider
      value={{
        cities,
        citiesArray,
        state,
        setDate: date => {
          convertTimeZone({ date }, () =>
            dispatch({
              type: "set_date",
              payload: date
            })
          );
        },
        setCity,
        setTime,
        arrowClicked: (data, orient) => {
          // data: {city: true} or {time: true}
          if (data.city) {
            setCity(state[orient].city, otherSide(orient));
          } else if (data.time) {
            setTime(state[orient].time, otherSide(orient));
          }
        },
        setNow: (time, orient) =>
          setTime(embedTimeInDate(state.date, time), orient)
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
